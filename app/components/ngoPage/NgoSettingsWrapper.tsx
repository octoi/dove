import React, { useState } from 'react';
import { ReactComponent, SetState } from '@/types/react.type';
import { NgoType } from '@/types/ngo.type';
import { EditImageWrapper } from '../EditImageWrapper';
import { useMutation } from '@apollo/client';
import { DELETE_NGO, UPDATE_NGO } from '@/graphql/ngo/ngo.mutation';
import { uploadImageHelper } from '@/utils/imageUpload';
import { PermissionWrapper } from '../PermissionWrapper';
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
  Input,
  Avatar,
  Flex,
  Textarea,
  useToast,
} from '@chakra-ui/react';

interface Props {
  ngo: NgoType;
  setNgo: SetState<NgoType | null>;
}

export const NgoSettingsWrapper: ReactComponent<Props> = ({
  children,
  ngo,
  setNgo,
}) => {
  const router = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState(ngo.name);
  const [description, setDescription] = useState(ngo.description);
  const [profile, setProfile] = useState(ngo.profile);
  const [banner, setBanner] = useState(ngo.banner);
  const [loading, setLoading] = useState(false);

  const [updateNgo] = useMutation(UPDATE_NGO);
  const [deleteNgo] = useMutation(DELETE_NGO);

  const closeModal = () => {
    setName(ngo.name);
    setDescription(ngo.description);
    setProfile(ngo.profile);
    setBanner(ngo.banner);
    setLoading(false);
    onClose();
  };

  const handleUpdateNgo = () => {
    return new Promise<void>((resolve, reject) => {
      setLoading(true);
      uploadImageHelper(banner)
        .then((bannerImageURL) => {
          uploadImageHelper(profile)
            .then((profileImageURL) => {
              let ngoData: NgoType = {
                ...ngo,
                name,
                description,
                profile: `${profileImageURL}`,
                banner: `${bannerImageURL}`,
              };
              updateNgo({
                variables: { ...ngoData, ngoId: ngo.id },
              })
                .then(() => {
                  setNgo(ngoData);
                  toast({
                    title: 'Looking good',
                    description: 'Updated ngo data successfully',
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                    duration: 3000,
                  });
                  closeModal();
                  resolve();
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  };

  const handleDeleteNgo = () => {
    setLoading(true);
    deleteNgo({ variables: { ngoId: ngo.id } })
      .then(() => {
        router.push(Paths.home);
        closeModal();
        toast({
          title: 'Delete ngo successfully.',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });
      })
      .catch((err) => {
        toast({
          title: 'Failed to delete ngo',
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
          <ModalHeader>Ngo Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditImageWrapper image={banner} setImage={setBanner}>
              <img
                src={banner}
                alt={name}
                className='w-full h-52 object-cover'
              />
            </EditImageWrapper>
            <EditImageWrapper image={profile} setImage={setProfile}>
              <Flex mt={5} alignItems='center'>
                <Avatar src={profile} name={ngo.name} size='xl' />
                <Button ml={3} colorScheme='blue' variant='outline'>
                  Edit profile
                </Button>
              </Flex>
            </EditImageWrapper>
            <Input
              mt={5}
              placeholder='Ngo name'
              type='text'
              size='lg'
              variant='filled'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
            <Textarea
              placeholder='Bio'
              size='lg'
              variant='filled'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mt={3}
              disabled={loading}
            />
          </ModalBody>

          <ModalFooter>
            <Flex alignItems='center' w='full' justifyContent='space-between'>
              <PermissionWrapper
                description="Are you sure you want to delete this ngo, this action can't be undone."
                placeholder='Delete NGO'
                onClick={handleDeleteNgo}
              >
                <Button
                  colorScheme='red'
                  disabled={loading}
                  isLoading={loading}
                >
                  Delete ngo
                </Button>
              </PermissionWrapper>
              <Flex alignItems='center'>
                <Button
                  variant='ghost'
                  mr={3}
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme='teal'
                  isLoading={loading}
                  disabled={
                    name === ngo.name &&
                    description === ngo.description &&
                    profile === ngo.profile &&
                    banner === ngo.banner
                  }
                  onClick={() => {
                    handleUpdateNgo()
                      .catch((err) => {
                        toast({
                          title: 'Failed to update ngo data',
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
                  }}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
