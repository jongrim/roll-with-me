import * as React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import RollableTable from '../Common/RollableTable/RollableTable';
import { RollableTableI } from '../Common/RollableTable/RollableTableTypes';
import QuillEditor from '../Common/QuillEditor/QuillEditor';

const resourceGeneratorTable: RollableTableI = {
  id: 'heart-resource-generator',
  title: 'Resource Generator',
  columns: [
    {
      id: 'value',
      title: 'Value',
      items: [
        {
          id: 'D-1',
          title: 'D4',
        },
        {
          id: 'D-2',
          title: 'D4',
        },
        {
          id: 'D-3',
          title: 'D4',
        },
        {
          id: 'D-4',
          title: 'D4',
        },
        {
          id: 'D-5',
          title: 'D4',
        },
        {
          id: 'D-6',
          title: 'D6',
        },
        {
          id: 'D-7',
          title: 'D6',
        },
        {
          id: 'D-8',
          title: 'D8',
        },
        {
          id: 'D-9',
          title: 'D10',
        },
        {
          id: 'D-10',
          title: 'D12',
        },
      ],
    },
    {
      id: 'domain',
      title: 'Domain',
      items: [
        {
          id: 'domain-1',
          title: 'Cursed',
        },
        {
          id: 'domain-2',
          title: 'Desolate',
        },
        {
          id: 'domain-3',
          title: 'Haven',
        },
        {
          id: 'domain-4',
          title: 'Haven',
        },
        {
          id: 'domain-5',
          title: 'Occult',
        },
        {
          id: 'domain-6',
          title: 'Religion',
        },
        {
          id: 'domain-7',
          title: 'Technology',
        },
        {
          id: 'domain-8',
          title: 'Warren',
        },
        {
          id: 'domain-9',
          title: 'Wild',
        },
        {
          id: 'domain-10',
          title: 'Combine two results',
        },
      ],
    },
  ],
};

export default function HeartFacilitator() {
  async function updateNotes(val: string) {
    // if (!moduleData?.id) return;
    // setIsSaving(true);
    // await updateGMModule(moduleData.id, val);
    // setIsSaving(false);
  }

  return (
    <Box pr={3}>
      <Heading as="h1" fontFamily="Roboto Slab" mb={6}>
        Game Facilitator Tools
      </Heading>
      <Box mb={6}>
        <QuillEditor save={updateNotes} initial={''} saveDelay={1500} />
      </Box>
      <RollableTable table={resourceGeneratorTable} />
    </Box>
  );
}
