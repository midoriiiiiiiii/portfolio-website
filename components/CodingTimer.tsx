"use client";
import React, { useState, useEffect } from 'react';

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CodingTimer: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date('2023-07-01T00:00:00'); // Replace with your start date

    const calculateTimeElapsed = () => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      // Adjust for negative values
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += previousMonth;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>
        {timeElapsed.years} years, {timeElapsed.months} months, {timeElapsed.days} days,{' '}
        {timeElapsed.hours} hours, {timeElapsed.minutes} minutes, {timeElapsed.seconds} seconds.
      </p>
    </div>
  );
};

