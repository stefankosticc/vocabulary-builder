import { List, Icon, Color, ActionPanel, Action } from "@raycast/api";
import LanguageForm from "./LanguageForm";

export function EmptyLanguagesView({ onLanguageAdded }: { onLanguageAdded: () => void }) {
  return (
    <List>
      <List.EmptyView
        title="No languages found"
        description="Add a language by pressing Enter or Cmd+N"
        icon={{ source: Icon.ExclamationMark, tintColor: Color.SecondaryText }}
        actions={
          <ActionPanel>
            <Action.Push
              title="Add New Language"
              icon={Icon.PlusSquare}
              target={<LanguageForm mode="add" />}
              shortcut={{ modifiers: ["cmd"], key: "n" }}
              onPop={onLanguageAdded}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
