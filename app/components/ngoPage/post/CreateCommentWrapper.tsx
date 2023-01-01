import React, { useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '@/graphql/comment/comment.mutation';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

interface Props {
  postId: number;
  refetch: () => void;
}

export const CreateCommentWrapper: ReactComponent<Props> = ({
  postId,
  refetch,
  children,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createComment] = useMutation(CREATE_COMMENT);

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setComment('');
    setLoading(false);
    onClose();
  };

  const handleCommentOnPost = () => {
    setLoading(true);

    createComment({ variables: { comment, postId } })
      .then(() => {
        closeModal();
        toast({
          title: 'Posted comment successfully.',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });
        refetch();
      })
      .catch((err) => {
        toast({
          title: 'Failed to create comment.',
          description: err?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comment on post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder='Comment..'
              variant='filled'
              w='full'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
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
              onClick={handleCommentOnPost}
              disabled={loading || comment.trim().length === 0}
              isLoading={loading}
              colorScheme='teal'
            >
              Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
