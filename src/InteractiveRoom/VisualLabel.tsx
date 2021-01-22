import * as React from 'react';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RiDeleteBin4Line, RiPencilLine } from 'react-icons/ri';
import { API } from 'aws-amplify';
import gsap, { Elastic } from 'gsap';
import { Draggable } from 'gsap/all';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { VisualLabel } from '../types';

const VLabel = ({
  label,
  setActionInProgress,
}: {
  label: VisualLabel;
  setActionInProgress: (val: boolean) => void;
}) => {
  const [trackedLabel, setTrackedLabel] = React.useState<VisualLabel>(label);
  const editLabel = async (val: string) => {
    if (val === trackedLabel.contents) return;
    setActionInProgress(true);
    try {
      API.graphql({
        query: mutations.updateLabel,
        variables: {
          input: {
            id: trackedLabel.id,
            contents: val,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const el = React.useRef(null);

  React.useEffect(() => {
    Draggable.create(el.current, {
      allowEventDefault: true,
      type: 'x,y',
      bounds: document.getElementById('dice-box'),
      onDragEnd: function () {
        try {
          API.graphql({
            query: mutations.updateLabel,
            variables: {
              input: {
                x: this.endX,
                y: this.endY,
                id: trackedLabel.id,
              },
            },
          });
        } catch (e) {
          console.warn(e);
        }
      },
    });
  }, [trackedLabel.id]);

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateLabelById,
      variables: {
        id: trackedLabel.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedLabel({
          x: value.data?.onUpdateLabelById?.x,
          y: value.data?.onUpdateLabelById?.y,
          contents: value.data?.onUpdateLabelById?.contents,
          id: value.data?.onUpdateLabelById?.id,
          roomId: value.data?.onUpdateLabelById?.roomId,
        });
        gsap.to(el.current, {
          x: value.data?.onUpdateLabelById?.x,
          y: value.data?.onUpdateLabelById?.y,
          duration: 0.25,
          ease: Elastic.easeOut.config(1, 1),
        });
        setActionInProgress(false);
      },
    });
    return () => subscription.unsubscribe();
  }, [trackedLabel.id, setActionInProgress]);

  React.useEffect(() => {
    gsap.to(el.current, {
      x: trackedLabel.x,
      y: trackedLabel.y,
      duration: 0.25,
      ease: Elastic.easeOut.config(1, 1),
    });
  }, [trackedLabel.x, trackedLabel.y]);

  return (
    <Flex
      id={trackedLabel.id}
      ref={el}
      display="inline-block"
      position="absolute"
      border="1px solid"
      borderColor="inherit"
      borderRadius="md"
      align="center"
      py={3}
      px={2}
    >
      <Editable
        defaultValue={label.contents}
        onSubmit={editLabel}
        display="inline-block"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <LabelActions
        id={trackedLabel.id}
        setActionInProgress={setActionInProgress}
      />
    </Flex>
  );
};

const LabelActions = ({
  id,
  setActionInProgress,
}: {
  id: string;
  setActionInProgress: (val: boolean) => void;
}) => {
  const deleteLabel = async () => {
    setActionInProgress(true);
    try {
      await API.graphql({
        query: mutations.deleteLabel,
        variables: {
          input: {
            id,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <IconButton
      variant="ghost"
      icon={<RiDeleteBin4Line />}
      size="sm"
      aria-label="delete label"
      ml={2}
      onClick={deleteLabel}
    />
  );
};

export default VLabel;
