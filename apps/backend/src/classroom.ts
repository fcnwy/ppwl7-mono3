import { google } from "googleapis";

export interface CourseWork {
  id: string;
  title: string;
  description?: string;
  dueDate?: { year: number; month: number; day: number };
  maxPoints?: number;
  materials?: Material[];
}

export interface Material {
  driveFile?: { driveFile: { id: string; title: string; alternateLink: string } };
  youtubeVideo?: { id: string; title: string; alternateLink: string };
  link?: { url: string; title: string };
  form?: { formUrl: string; title: string };
}

export interface Submission {
  id: string;
  courseWorkId: string;
  state: string;
  assignedGrade?: number;
  draftGrade?: number;
  late?: boolean;
  assignmentSubmission?: {
    attachments?: SubmissionAttachment[];
  };
  shortAnswerSubmission?: { answer: string };
  multipleChoiceSubmission?: { answer: string };
}

export interface SubmissionAttachment {
  driveFile?: { id: string; title: string; alternateLink: string };
  link?: { url: string; title: string };
  form?: { formUrl: string; title: string; responseUrl: string };
  youtubeVideo?: { id: string; title: string; alternateLink: string };
}

export async function getCourses(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.list({ studentId: "me", pageSize: 20 });
  return res.data.courses ?? [];
}

export async function getCourseWorks(accessToken: string, courseId: string): Promise<CourseWork[]> {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.courseWork.list({
    courseId,
    pageSize: 20,
    orderBy: "dueDate desc",
  });
  return (res.data.courseWork ?? []) as CourseWork[];
}

export async function getSubmissions(accessToken: string, courseId: string): Promise<Submission[]> {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.courseWork.studentSubmissions.list({
    courseId,
    courseWorkId: "-",
    userId: "me",
    pageSize: 50,
  });
  return (res.data.studentSubmissions ?? []) as Submission[];
}