import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/post/post.mutation';
import { ReactComponent } from '@/types/react.type';
import { EditImageWrapper } from '../../EditImageWrapper';
import { uploadImageHelper } from '@/utils/imageUpload';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/react';

interface Props {
  ngoId: string;
}

export const CreatePostWrapper: ReactComponent<Props> = ({
  children,
  ngoId,
}) => {
  const router = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [text, setText] = useState('');
  const [media, setMedia] = useState('');
  const [loading, setLoading] = useState(false);

  const [createPost] = useMutation(CREATE_POST);

  const closeModal = () => {
    setText('');
    setMedia('');
    setLoading(false);
    onClose();
  };

  const handleCreatePost = () => {
    setLoading(true);
    uploadImageHelper(media || '')
      .then((imageURL) => {
        createPost({ variables: { ngoId, text, media: imageURL } })
          .then(({ data }) => {
            let postId = data?.createPost?.id;
            router.push(`${Paths.ngo}/${ngoId}/${postId}`);
            toast({
              title: 'Created post successfully.',
              status: 'success',
              position: 'top-right',
              isClosable: true,
              duration: 3000,
            });
          })
          .catch((err) => {
            toast({
              title: 'Failed to create post.',
              description: err?.message,
              status: 'error',
              position: 'top-right',
              isClosable: true,
              duration: 5000,
            });
          });
      })
      .catch((err) => {
        toast({
          title: 'Failed to upload image.',
          description: err?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      });

    // createPost({ variables: { ngoId, text, media } });
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder='Text content'
              variant='filled'
              w='full'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            {media && <img src={media} alt='' className='w-full mt-3' />}
            <EditImageWrapper image={media} setImage={setMedia}>
              <Button mt={3} w='full' variant='outline'>
                {media ? 'Edit image' : 'Add image'}
              </Button>
            </EditImageWrapper>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              disabled={loading || text.trim().length === 0}
              isLoading={loading}
              colorScheme='teal'
            >
              Create Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
