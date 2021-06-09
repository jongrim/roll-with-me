import * as React from 'react';
import debounce from 'lodash.debounce';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Quill, { QuillOptionsStatic } from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './quill.css';

export default function QuillEditor({
  initial,
  save,
  saveDelay = 3000,
  height = 'md',
  placeholder = 'Create something great. Notes are saved automatically.',
  editorId = 'editor',
  toolbar = true,
  readOnly = false,
  fontFamily = 'inherit',
  fontSize = 'inherit',
  updateOnChange = false,
}: {
  initial?: string | null;
  save: (val: string) => void;
  saveDelay?: number;
  height?: string;
  placeholder?: string;
  editorId?: string;
  toolbar?: boolean;
  options?: Record<string, unknown>;
  readOnly?: boolean;
  fontFamily?: string;
  fontSize?: string;
  updateOnChange?: boolean;
}) {
  const [editor, setEditor] = React.useState<Quill>();

  const handleChange = React.useMemo(
    () =>
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
    [editor, save, saveDelay]
  );

  React.useEffect(() => {
    const options: QuillOptionsStatic = {
      placeholder,
      theme: toolbar ? 'snow' : 'bubble',
      readOnly,
    };
    if (toolbar) {
      options.modules = {
        toolbar: [
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
        ],
      };
    }
    const quill = new Quill(`#${editorId}`, options);
    if (initial) {
      let contents;
      try {
        contents = JSON.parse(initial);
      } catch (e) {
        contents = [{ insert: initial }];
      }
      quill?.setContents(contents);
    }
    setEditor(quill);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (initial && editor && updateOnChange) {
      const current = editor?.getContents().ops;
      if (initial !== JSON.stringify(current)) {
        let contents;
        try {
          contents = JSON.parse(initial);
        } catch (e) {
          contents = [{ insert: initial }];
        }
        editor?.setContents(contents);
      }
    }
  }, [initial, editor, updateOnChange]);

  React.useEffect(() => {
    editor?.on('text-change', handleChange);
  }, [editor, handleChange]);

  const color = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box overflow="auto" color={color} stroke={color}>
      <Box
        id={editorId}
        w="full"
        h={height}
        fontFamily={fontFamily}
        fontSize={fontSize}
        color="inherit"
      />
    </Box>
  );
}
