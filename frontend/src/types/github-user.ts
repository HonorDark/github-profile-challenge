export interface GitHubUser {
  username: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  profileUrl: string;
  location: string | null;
  company: string | null;
  website: string | null;
  publicRepositories: number;
  followers: number;
  following: number;
  createdAt: string;
}