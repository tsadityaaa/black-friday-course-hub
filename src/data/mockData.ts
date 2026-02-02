export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
}

export interface Subscription {
  id: string;
  userId: string;
  courseId: string;
  pricePaid: number;
  subscribedAt: string;
}

// Dummy users for login
export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
  },
  {
    id: "user-3",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123",
  },
];

// Mock courses data
export const courses: Course[] = [
  {
    id: "course-1",
    title: "React Masterclass",
    description: "Learn React from scratch to advanced concepts",
    fullDescription:
      "This comprehensive React course covers everything from basic concepts like components and state management to advanced topics like hooks, context API, and performance optimization. Perfect for developers looking to master modern React development.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "course-2",
    title: "TypeScript Fundamentals",
    description: "Master TypeScript for better JavaScript development",
    fullDescription:
      "Dive deep into TypeScript and learn how to write type-safe JavaScript. This course covers types, interfaces, generics, decorators, and integration with popular frameworks. Build more maintainable and scalable applications.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "course-3",
    title: "Web Development Basics",
    description: "Start your coding journey with HTML, CSS & JavaScript",
    fullDescription:
      "A beginner-friendly course that teaches the fundamentals of web development. Learn HTML for structure, CSS for styling, and JavaScript for interactivity. Build real projects and kickstart your developer career.",
    price: 0,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "course-4",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    fullDescription:
      "Learn server-side JavaScript with Node.js. This course covers Express.js, REST APIs, database integration, authentication, and deployment. Build production-ready backend applications from scratch.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "course-5",
    title: "CSS & Tailwind Mastery",
    description: "Create stunning UIs with modern CSS techniques",
    fullDescription:
      "Master CSS from fundamentals to advanced techniques including Flexbox, Grid, animations, and responsive design. Also learn Tailwind CSS for rapid UI development. Create beautiful, modern user interfaces.",
    price: 0,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "course-6",
    title: "Full-Stack JavaScript",
    description: "Become a complete JavaScript developer",
    fullDescription:
      "The ultimate full-stack course covering React, Node.js, MongoDB, and deployment. Build complete web applications from frontend to backend. Includes real-world projects and best practices for modern development.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
  },
];

// Valid promo code
export const VALID_PROMO_CODE = "BFSALE25";
export const PROMO_DISCOUNT = 0.5; // 50% discount

export const validatePromoCode = (code: string): boolean => {
  return code.toUpperCase() === VALID_PROMO_CODE;
};

export const calculateDiscountedPrice = (price: number, promoApplied: boolean): number => {
  if (promoApplied && price > 0) {
    return price * (1 - PROMO_DISCOUNT);
  }
  return price;
};
