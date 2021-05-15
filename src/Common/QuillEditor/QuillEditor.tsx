import * as React from 'react';
import debounce from 'lodash.debounce';
import { Box } from '@chakra-ui/react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function QuillEditor({
  initial,
  save,
  saveDelay = 3000,
}: {
  initial: string | null;
  save: (val: string) => void;
  saveDelay?: number;
}) {
  const [editor, setEditor] = React.useState<Quill>();

  const handleChange = React.useCallback(
    debounce(
      (
        delta: unknown,
        oldDelta: unknown,
        source: 'user' | 'api' | 'silent'
      ) => {
        const contents = editor?.getContents().ops;
        save(JSON.stringify(contents));
      },
      saveDelay
    ),
    [editor]
  );

  React.useEffect(() => {
    const options = {
      module: {
        toolbar: '#toolbar',
      },
      placeholder: 'Create something great. Notes are saved automatically.',
      theme: 'snow',
    };
    const quill = new Quill('#editor', options);
    if (initial) {
      quill.setContents(JSON.parse(initial));
    }
    setEditor(quill);
  }, [initial]);

  React.useEffect(() => {
    editor?.on('text-change', handleChange);
  }, [editor, handleChange]);

  return (
    <Box overflow="auto">
      <Box id="toolbar" w="full" />
      <Box id="editor" w="full" h="md" />
    </Box>
  );
}
