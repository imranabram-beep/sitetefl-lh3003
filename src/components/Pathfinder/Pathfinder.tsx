import Link from "next/link";
import "./Pathfinder.css";
import { PathfinderCard } from "./PathfinderCard";

/**
 * Pathfinder Component - Teaching adventure paths
 * Displays 4 main teaching paths with interactive cards
 */
export function Pathfinder() {
  const paths = [
    {
      id: "asia-explorer",
      title: "Asia Explorer",
      description:
        "Teach in vibrant and exotic Asia-Pacific locations. Immerse yourself in diverse cultures across Thailand, Vietnam, Korea and beyond.",
      tags: ["Thailand", "Vietnam", "South Korea"],
      image: "/images/Landing/Placeholder/1. Asia PH.svg",
      href: "/jobs",
    },
    {
      id: "europe-dream",
      title: "Europe Dream",
      description:
        "Teach Western Europe as a student and creator. Build your teaching career in established European language schools.",
      tags: ["Spain", "Italy", "France"],
      image: "/images/Landing/Placeholder/2. Europe PH.svg",
      href: "/jobs",
    },
    {
      id: "online-nomad",
      title: "Online Nomad",
      description:
        "Teach English from anywhere. Build your client base and earn flexible income teaching online globally.",
      tags: ["Remote teaching", "Flexible hours", "Global reach"],
      image: "/images/Landing/Placeholder/3. Couple PH.svg",
      href: "/courses",
    },
    {
      id: "specialized-skills",
      title: "Specialized Skills",
      description:
        "Diploma-level specialization. Develop advanced teaching skills for business English and young learners.",
      tags: ["Business English", "Young Learners", "Corporate training"],
      image: "/images/Landing/Placeholder/4. Diploma PH.svg",
      href: "/courses",
    },
  ];

  return (
    <section className="pathfinder">
      <div className="pathfinder-container">
        <div className="pathfinder-header">
          <h2 className="pathfinder-title">Pathfinder: Choose Your Teaching Adventure</h2>
        </div>

        <div className="pathfinder-grid">
          {paths.map((path) => (
            <PathfinderCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </section>
  );
}
