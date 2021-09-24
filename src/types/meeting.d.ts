type StartTime = {
  hours: number;
  minutes: number;
}

type EndTime = {
  hours: number;
  minutes: number;
}

type Attendee = {
  userId: string;
  email: string;
}

interface IMeeting {
  _id?: string;
  name: string;
  description: string;
  date: string;
  startTime: StartTime;
  endTime: EndTime;
  attendees: Attendee[];
}
