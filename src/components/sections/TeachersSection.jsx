import React from "react";
import { TeacherCarousel } from "@/components/ui/services-card";
import { teachers } from "@/data/content";

export default function TeachersSection({ onOpenModal }) {
  const handleTeacherClick = (teacher) => {
    if (onOpenModal) {
      onOpenModal(`Guru: ${teacher.name} (${teacher.specialty || teacher.specialization || "Bimbingan Mengaji"})`);
    }
  };

  return (
    <div id="guru">
      <TeacherCarousel
        teachers={teachers}
        heading="Guru Unggulan"
        subheading="Belajar bersama guru berpengalaman yang siap membantu meningkatkan kemampuan mengaji kamu."
        onTeacherClick={handleTeacherClick}
      />
    </div>
  );
}
