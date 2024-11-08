export default class Datediff {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  getSeconds() {
    return Math.floor((this.end.getTime() - this.start.getTime()) / 1000);
  }

  getMinutes() {
    return Math.floor(this.getSeconds() / 60);
  }

  getHours() {
    return Math.floor(this.getMinutes() / 60);
  }

  getDays() {
    return Math.floor(this.getHours() / 24);
  }

  getWeeks() {
    return Math.floor(this.getDays() / 7);
  }

  getMonths() {
    const startY = this.start.getFullYear();
    const endY = this.end.getFullYear();
    const startM = this.start.getMonth();
    const endM = this.end.getMonth();

    return endM + 12 * endY - (startM + 12 * startY);
  }

  getYears() {
    return this.end.getFullYear() - this.start.getFullYear();
  }

  getLargestFormattedDiff() {
    return this.getYears() > 0
      ? `${this.getYears()} years`
      : this.getMonths() > 0
      ? `${this.getMonths()} months`
      : this.getWeeks() > 0
      ? `${this.getWeeks()} weeks`
      : this.getDays() > 0
      ? `${this.getDays()} days`
      : this.getHours() > 0
      ? `${this.getHours()} hours`
      : this.getMinutes() > 0
      ? `${this.getMinutes()} minutes`
      : this.getSeconds() > 0
      ? `${this.getSeconds()} seconds`
      : 'Just now';
  }
}
