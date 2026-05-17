"use client";

import { ContactModal } from "@/components/site/ContactModal";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
};

export function ProjectRequestModal({ open, onOpenChange, projectTitle }: Props) {
  return (
    <ContactModal
      open={open}
      onOpenChange={onOpenChange}
      title="Заявка на похожий проект"
      description={`Расскажите о задаче — мы предложим формат и сроки, ориентируясь на кейс «${projectTitle}».`}
      defaultMessage={`Здравствуйте! Хочу обсудить проект, похожий на «${projectTitle}».`}
    />
  );
}
