export const isErrorWithMessage = (
  error: unknown
): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};
export const getFutureTimestamp = (years: string | number) => {
  // Ensure the input is a number
  const numberOfYears = typeof years === "string" ? parseInt(years, 10) : years;

  // Validate that the input is a valid number
  if (isNaN(numberOfYears) || numberOfYears < 0) {
    throw new Error(
      "Invalid input: please provide a non-negative number or a numeric string."
    );
  }

  // Get the current date
  const currentDate = new Date();

  // Set the future date by adding the number of years
  currentDate.setFullYear(currentDate.getFullYear() + numberOfYears);

  // Return the future timestamp
  return currentDate;
};

export const isPastTimestamp = (timestamp: Date) => {
  // Convert the input to a Date object
  const inputDate = new Date(timestamp);

  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
    throw new Error(
      "Invalid input: please provide a valid date string or timestamp."
    );
  }

  // Get the current date
  const currentDate = new Date();

  // Return true if the input date is in the past
  return inputDate < currentDate;
};

export const increadTimeStampByAYear = (date: Date, years: string) => {
  const numberOfYears = typeof years === "string" ? parseInt(years, 10) : years;

  if (isNaN(numberOfYears) || numberOfYears < 0) {
    throw new Error(
      "Invalid input: please provide a non-negative number or a numeric string."
    );
  }

  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + numberOfYears);
  return newDate;
};
