import type { ContributionDay, ContributionLevel, ContributionWeek } from "@/lib/github-contributions";

const levelClassNames: Record<ContributionLevel, string> = {
  NONE: "none",
  FIRST_QUARTILE: "first-quartile",
  SECOND_QUARTILE: "second-quartile",
  THIRD_QUARTILE: "third-quartile",
  FOURTH_QUARTILE: "fourth-quartile",
};

function contributionLabel(day: ContributionDay) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${day.date}T00:00:00Z`));
  const contributionWord = day.contributionCount === 1 ? "contribution" : "contributions";

  return `${formattedDate} — ${day.contributionCount} ${contributionWord}`;
}

function monthLabels(weeks: ContributionWeek[]) {
  let previousMonth = "";

  return weeks.flatMap((week, weekIndex) => {
    const firstDayOfMonth = week.contributionDays.find((day) => day.date.endsWith("-01"));
    const labelDay = firstDayOfMonth ?? week.contributionDays[0];
    if (!labelDay) {
      return [];
    }

    const month = new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(new Date(`${labelDay.date}T00:00:00Z`));

    if (month === previousMonth) {
      return [];
    }

    previousMonth = month;
    return [{ month, weekIndex }];
  });
}

export function GitHubContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
  const months = monthLabels(weeks);

  return (
    <div className="github-contribution-bottom">
      <div className="github-contribution-scroll">
        <div className="github-contribution-calendar">
          <div className="github-contribution-months" aria-hidden="true">
            {months.map(({ month, weekIndex }) => (
              <span key={`${month}-${weekIndex}`} style={{ gridColumnStart: weekIndex + 1 }}>
                {month}
              </span>
            ))}
          </div>
          <div className="github-contribution-grid-layout">
            <div className="github-contribution-weekdays" aria-hidden="true">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>
            <div className="github-contribution-graph" role="group" aria-label="GitHub contributions for the past year">
              {weeks.map((week, weekIndex) => (
                <div className="github-contribution-week" key={`${weekIndex}-${week.contributionDays[0]?.date ?? "week"}`}>
                  {week.contributionDays.map((day) => {
                    const label = contributionLabel(day);
                    return (
                      <span
                        aria-label={label}
                        className={`github-contribution-day github-contribution-day-${levelClassNames[day.contributionLevel]}`}
                        key={day.date}
                        role="img"
                        title={label}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="github-contribution-legend" aria-label="Contribution intensity legend">
            <span>Less</span>
            {Object.values(levelClassNames).map((level) => (
              <span className={`github-contribution-day github-contribution-day-${level}`} key={level} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
      <span className="github-contribution-attribution">GitHub Contributions</span>
    </div>
  );
}
