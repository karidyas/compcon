import { ItemType } from "../enums"
import { Clock } from "./Clock"
import { CollectionItem, ICollectionItemData } from "./CollectionItem"
import { RollableTable } from "./RollableTable"

interface ILocationData extends ICollectionItemData {
}

class Location extends CollectionItem {

  public constructor(data?: ILocationData) {
    super(data)
    this.ItemType = ItemType.Location
  }

  public get SectionSuggestions(): string[] {
    return ['History', 'Climate', 'Geography', 'Flora and Fauna', 'Resources']
  }

  public static Serialize(l: Location): ILocationData {
    return {
      id: l.ID,
      name: l.Name,
      description: l.Description,
      notes: l.Notes,
      image: l.img,
      sections: l.Sections,
      locations: l.Locations,
      factions: l.Factions,
      npcs: l.NPCs,
      labels: l.Labels,
      clocks: l.Clocks.length ? l.Clocks.map(x => Clock.Serialize(x)) : [],
      tables: l.Tables.length ? l.Tables.map(x => RollableTable.Serialize(x)) : [],
    }
  }

  public static Deserialize(data: ILocationData): Location {
    return new Location(data)
  }
}

export { Location, ILocationData }
