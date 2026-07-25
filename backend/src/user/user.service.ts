import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { GitHubUserDto } from "./dto/github-user.dto";

interface GitHubUserResponse {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

@Injectable()
export class UserService {
  async findByUsername(username: string): Promise<GitHubUserDto> {
    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "github-profile-challenge",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
          },
        },
      );

      if (response.status === 404) {
        throw new NotFoundException(
          `El usuario de GitHub "${username}" no existe`,
        );
      }

      if (!response.ok) {
        throw new BadGatewayException(
          "No se pudo obtener la información desde GitHub",
        );
      }

      const user = (await response.json()) as GitHubUserResponse;

      return {
        username: user.login,
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        location: user.location,
        company: user.company,
        website: user.blog,
        publicRepositories: user.public_repos,
        followers: user.followers,
        following: user.following,
        createdAt: user.created_at,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadGatewayException
      ) {
        throw error;
      }

      throw new BadGatewayException(
        "Ocurrió un error al comunicarse con GitHub",
      );
    }
  }
}
