import { ItemType } from "../enums"
import { Clock } from "./Clock"
import { CollectionItem, ICollectionItemData } from "./CollectionItem"
import { RollableTable } from "./RollableTable"

interface ICharacterData extends ICollectionItemData {
  alias?: string
  title?: string
  pronouns?: string
}

class Character extends CollectionItem {
  public Alias: string
  public Title: string
  public Pronouns: string

  public constructor(data?: ICharacterData) {
    super(data)
    this.Alias = data?.alias || ''
    this.Title = data?.title || ''
    this.Pronouns = data?.pronouns || ''
    this.ItemType = ItemType.Character
  }

  public get SectionSuggestions(): string[] {
    return ['History', 'Personality', 'Skills', 'Motivations', 'Resources']
  }

  public static Serialize(c: Character): ICharacterData {
    return {
      id: c.ID,
      alias: c.Alias,
      title: c.Title,
      pronouns: c.Pronouns,
      name: c.Name,
      description: c.Description,
      notes: c.Notes,
      image: c.img,
      sections: c.Sections,
      locations: c.Locations,
      factions: c.Factions,
      npcs: c.NPCs,
      labels: c.Labels,
      clocks: c.Clocks.length ? c.Clocks.map(x => Clock.Serialize(x)) : [],
      tables: c.Tables.length ? c.Tables.map(x => RollableTable.Serialize(x)) : [],
    }
  }

  public static Deserialize(data: ICharacterData): Character {
    return new Character(data)
  }
}


export { Character, ICharacterData }
