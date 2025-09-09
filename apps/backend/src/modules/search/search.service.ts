import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  private posts = [
    { id: 'p1', userId: 'u1', category: 'events', title: 'Farmers Market', content: 'Saturday 10am', location: 'Nairobi', createdAt: new Date().toISOString() },
    { id: 'p2', userId: 'u2', category: 'services', title: 'Math Tutor Available', content: 'Offering tutoring for high school math.', location: 'Mombasa', createdAt: new Date().toISOString() },
  ];

  searchPosts(category?: string, location?: string, keyword?: string) {
    let results = this.posts;

    if (category) {
      results = results.filter(p => p.category === category);
    }

    if (location) {
      results = results.filter(p => p.location === location);
    }

    if (keyword) {
      results = results.filter(p => p.title.includes(keyword) || p.content.includes(keyword));
    }

    return results;
  }
}