function numberToSuffix(n: number) {
  if (n === 1) {
    return "st";
  } else if (n === 2) {
    return "nd";
  } else if (n === 3) {
    return "rd";
  }
  return "th";
}

export function Place({ index }: { index: number }) {
  const place = index + 1;
  const suffix = numberToSuffix(place);

  return (
    <span>
      {place}
      {suffix}
    </span>
  );
}
