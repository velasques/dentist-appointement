import { useTranslations } from "next-intl";
import { CiBookmark } from "react-icons/ci";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal";
import BookFrom from "./BookFrom";
const BookNow = () => {
  const t = useTranslations();

  return (
    <Modal>
      <ModalTrigger className='bg-mid-blue-design text-secondary flex items-center gap-1 cursor-pointer'>
        <CiBookmark />
        <span className='hidden md:flex'>{t("book")}</span>
      </ModalTrigger>

      <ModalBody>
        <ModalContent>
          <BookFrom />
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default BookNow;
