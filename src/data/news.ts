export interface NewsItem {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  date: string;
  link: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Understanding Modern Legal Challenges in Digital Age",
    description: "Explore how traditional legal frameworks adapt to emerging technologies and digital transformation in today's business environment.",
    backgroundImage: "/images/Abogados.jpg",
    date: "Jun 10, 2025",
    link: "#experience"
  },
  {
    id: "2",
    title: "Corporate Governance Best Practices for 2025",
    description: "Discover the latest corporate governance strategies that help businesses maintain transparency and accountability in modern markets.",
    backgroundImage: "/images/image.jpg",
    date: "Jun 8, 2025",
    link: "#experience"
  },
  {
    id: "3",
    title: "International Trade Regulations Update",
    description: "Stay updated with the most recent changes in international trade laws and how they affect cross-border business operations.",
    backgroundImage: "/images/Abogados.jpg",
    date: "Jun 5, 2025",
    link: "#experience"
  },
  {
    id: "4",
    title: "Employment Law Changes You Need to Know",
    description: "Learn about the critical employment law updates that impact both employers and employees in the current legal landscape.",
    backgroundImage: "/images/image.jpg",
    date: "Jun 3, 2025",
    link: "#experience"
  }
];