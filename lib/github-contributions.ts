export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: unknown;
        };
      };
    } | null;
  };
};

const CONTRIBUTION_LEVELS = new Set<ContributionLevel>([
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
]);

function isContributionDay(value: unknown): value is ContributionDay {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const day = value as Record<string, unknown>;
  return (
    typeof day.date === "string" &&
    typeof day.contributionCount === "number" &&
    typeof day.contributionLevel === "string" &&
    CONTRIBUTION_LEVELS.has(day.contributionLevel as ContributionLevel)
  );
}

function parseWeeks(value: unknown): ContributionWeek[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const weeks = value.map((week) => {
    if (typeof week !== "object" || week === null) {
      return null;
    }

    const contributionDays = (week as Record<string, unknown>).contributionDays;
    if (!Array.isArray(contributionDays) || !contributionDays.every(isContributionDay)) {
      return null;
    }

    return { contributionDays };
  });

  return weeks.length > 0 && weeks.every((week): week is ContributionWeek => week !== null)
    ? weeks
    : null;
}

export async function getGitHubContributionWeeks(): Promise<ContributionWeek[] | null> {
  const token = process.env.GITHUB_CONTRIBUTIONS_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ContributionCalendar($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: "bdonaldharris" },
      }),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as ContributionsResponse;
    return parseWeeks(
      payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks,
    );
  } catch {
    return null;
  }
}
