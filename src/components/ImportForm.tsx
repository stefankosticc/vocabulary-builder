import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import fs from "fs";

export function ImportForm({ onImport }: { onImport: (content: string) => void }) {
  const { pop } = useNavigation();
  const { handleSubmit, itemProps } = useForm<{ files: string[] }>({
    onSubmit(values) {
      const file = values.files[0];
      const content = fs.readFileSync(file, "utf-8");
      onImport(content);
      pop();
    },
    validation: {
      files: (value) => {
        if (!value || value.length === 0) return "Please select a file";
      },
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Import" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.FilePicker
        {...itemProps.files}
        title="Select File"
        info="File should be a text file with lines in the format: timestamp | word - translation"
        allowMultipleSelection={false}
        canChooseFiles={true}
        canChooseDirectories={false}
      />
    </Form>
  );
}
