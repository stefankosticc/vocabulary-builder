import { ActionPanel, Action, Icon, List, Color } from "@raycast/api";
import { useCachedState } from "@raycast/utils";

const ITEMS = Array.from(Array(3).keys()).map((key) => {
  return {
    id: key,
    icon: Icon.Bird,
    title: "Title " + key,
    subtitle: "Subtitle",
    accessory: "Accessory",
    language: key === 0 ? "Spanish" : "French",
  };
});

type LanguageType = { id: string; name: string; color: Color };

function LanguageDropdown(props: { languageTypes: LanguageType[]; onLanguageTypeChange: (newValue: string) => void }) {
  const { languageTypes: languageTypes, onLanguageTypeChange: onLanguageTypeChange } = props;
  return (
    <List.Dropdown
      tooltip="Select Language"
      storeValue={true}
      onChange={(newValue) => {
        onLanguageTypeChange(newValue);
      }}
      defaultValue={languageTypes[1].name}
    >
      <List.Dropdown.Section title="Language Notebooks">
        {languageTypes.map((languageType) => (
          <List.Dropdown.Item
            key={languageType.id}
            title={languageType.name}
            value={languageType.name}
            icon={{ source: Icon.Circle, tintColor: languageType.color }}
          />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}

export default function Command() {
  const languageTypes: LanguageType[] = [
    { id: "1", name: "Spanish", color: Color.Orange },
    { id: "2", name: "French", color: Color.Blue },
  ];

  const [selectedLanguage, setSelectedLanguage] = useCachedState<string>("Spanish", "Spanish");

  const filteredItems = ITEMS.filter((item) => item.language === selectedLanguage);

  return (
    <List
      searchBarAccessory={<LanguageDropdown languageTypes={languageTypes} onLanguageTypeChange={setSelectedLanguage} />}
    >
      <List.Section title={"Total count: " + filteredItems.length}>
        {filteredItems.map((item) => (
          <List.Item
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            accessories={[{ icon: Icon.Text, text: item.accessory }, { tag: item.language }]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard content={item.title} />
              </ActionPanel>
            }
          />
        ))}
        <List.Item title="2026-03-11 12:38:20 | remolacha - beet"></List.Item>
        <List.Item title="2026-03-11 12:38:20 | cangrejos - crabs"></List.Item>
      </List.Section>
    </List>
  );
}
