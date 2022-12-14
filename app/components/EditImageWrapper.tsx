import React, { useState } from 'react';
import { ReactComponent, SetState } from '@/types/react.type';
import { RiImageEditFill } from 'react-icons/ri';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  image: string;
  setImage: SetState<string>;
}

export const EditImageWrapper: ReactComponent<Props> = ({
  image,
  setImage,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayImage, setDisplayImage] = useState<undefined | string>();
  const imageInputRef = React.useRef<any>();

  const closeModal = () => {
    setDisplayImage(undefined);
    onClose();
  };

  return (
    <>
      <div
        onClick={onOpen}
        className='cursor-pointer w-full flex items-center justify-center'
      >
        {children}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex items-center justify-center flex-col'>
              <img className='max-h-96' src={displayImage || image} alt='' />
              <Button
                mt={3}
                size='lg'
                w='full'
                colorScheme='blue'
                onClick={() => imageInputRef.current.click()}
              >
                <RiImageEditFill className='mr-1' /> Edit image
              </Button>
            </div>

            <input
              type='file'
              accept='image/*'
              ref={imageInputRef}
              className='hidden'
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  setDisplayImage(undefined);
                  return;
                }

                if (e.target.files[0].type.includes('image/')) {
                  let file = e.target.files[0];
                  let reader = new FileReader();

                  reader.onloadend = () => {
                    setDisplayImage(URL.createObjectURL(file));
                  };

                  if (file) reader.readAsDataURL(file);
                } else {
                  alert('Unsupported file type');
                }
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={2} onClick={closeModal}>
              Cancel
            </Button>
            <Button
              colorScheme='teal'
              disabled={!displayImage}
              onClick={() => {
                setImage(displayImage || image);
                closeModal();
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
