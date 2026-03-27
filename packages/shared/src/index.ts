export interface HealthCheck {
  status: string
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface User {
  id: number
  email: string 
  name: string | null
}

export interface Course {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  room?: string;
  enrollmentCode?: string;
}

export interface CourseMaterial {
  driveFile?: { driveFile: { id: string; title: string; alternateLink: string } };
  youtubeVideo?: { id: string; title: string; alternateLink: string };
  link?: { url: string; title: string };
  form?: { formUrl: string; title: string };
}

export interface CourseWorkItem {
  id: string;
  title: string;
  description?: string;
  dueDate?: { year: number; month: number; day: number };
  maxPoints?: number;
  materials?: CourseMaterial[];
}

export interface SubmissionAttachmentItem {
  driveFile?: { id: string; title: string; alternateLink: string };
  link?: { url: string; title: string };
  form?: { formUrl: string; title: string; responseUrl: string };
  youtubeVideo?: { id: string; title: string; alternateLink: string };
}

export interface StudentSubmission {
  id: string;
  courseWorkId: string;
  state: string; // "NEW" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT"
  assignedGrade?: number;
  draftGrade?: number;
  late?: boolean;
  assignmentSubmission?: { attachments?: SubmissionAttachmentItem[] };
  shortAnswerSubmission?: { answer: string };
  multipleChoiceSubmission?: { answer: string };
}

export interface CourseWorkWithSubmission {
  courseWork: CourseWorkItem;
  submission: StudentSubmission | null;
}