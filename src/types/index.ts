export type UserRole = 'admin' | 'member' | 'demo';

export interface User {
  id: string;
  name: string;
  nameBn?: string;
  nickname: string;
  email: string;
  avatar: string;
  bio: string;
  bioBn?: string;
  role: UserRole;
  joinedAt: string;
  socials?: { facebook?: string; instagram?: string; github?: string };
  stats: { trips: number; stories: number; photos: number };
}

export interface TourEvent {
  id: string;
  title: string;
  titleBn?: string;
  location: string;
  locationBn?: string;
  date: string;
  endDate?: string;
  coverImage: string;
  description: string;
  descriptionBn?: string;
  participants: string[];
  tags: string[];
  color: string; // gradient accent color per event
  googlePhotosUrl?: string;
  expenses?: { item: string; amount: number; currency: string }[];
  coordinates?: { lat: number; lng: number };
}

export interface Story {
  id: string;
  eventId: string;
  authorId: string;
  title: string;
  titleBn?: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  reactions: { type: string; count: number }[];
  commentsCount: number;
}

export interface Comment {
  id: string;
  storyId: string;
  authorId: string;
  content: string;
  createdAt: string;
  reactions: { type: string; count: number }[];
}

export interface UpcomingTour {
  id: string;
  title: string;
  titleBn?: string;
  destination: string;
  destinationBn?: string;
  plannedDate: string;
  coverImage: string;
  description: string;
  confirmedMembers: string[];
  status: 'planning' | 'confirmed' | 'upcoming';
}

export interface Notification {
  id: string;
  type: 'story' | 'event' | 'comment' | 'tour' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface GalleryImage {
  id: string;
  eventId: string;
  url: string;
  caption?: string;
  uploadedBy: string;
}
