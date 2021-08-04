import uuid from 'uuid/v4'
import { ISectionData, Section } from './campaign_elements/Section'
import { Character, ICharacterData } from './Character'
import { Faction, IFactionData } from './Faction'
import { ILocationData, Location } from './Location'

interface ICampaignData {
  id?: string
  name?: string
  image?: string
  authors?: string
  description?: string
  contributors?: string
  license?: string
  sections: ISectionData[]
  characters: ICharacterData[]
  factions: IFactionData[]
  locations: ILocationData[]
}

class Campaign {
  public readonly ID: string
  public Name: string
  public Image: string
  public Authors: string
  public Description: string
  public Contributors: string
  public License: string
  public Sections: Section[]
  public Characters: Character[]
  public Locations: Location[]
  public Factions: Faction[]

  constructor(data?: ICampaignData) {
    this.ID = data.id || uuid()
    this.Name = data.name || 'New Campaign'
    this.Image = data.image || ''
    this.Authors = data.authors || ''
    this.Description = data.description || ''
    this.Contributors = data.contributors || ''
    this.License = data.license || ''
    this.Sections = data.sections.map(s => Section.Deserialize(s))
    this.Characters = data.characters.map(c => Character.Deserialize(c))
    this.Locations = data.locations.map(l => Location.Deserialize(l))
    this.Factions = data.factions.map(f => Faction.Deserialize(f))
  }

  public AddSection() {
    this.Sections.push(new Section({
      id: uuid(),
      title: 'New Section',
      item_number: (this.Sections.length + 1).toString(),
      content: [],
      children: [],
      item_type: 'Section'
    }))
  }

  public MoveSection(from: number, to: number) {
    this.Sections = this.Sections.splice(to, 0, this.Sections.splice(from, 1)[0]);
  }

  public DeleteSection(s: Section) {
    const idx = this.Sections.findIndex(x => x.ID === s.ID)
    if (idx === -1) return
    this.Sections.splice(idx, 1)
  }

  public AddCharacter() {
    this.Characters.push(new Character({ name: 'New Character' }))
  }

  public AddFaction() {
    this.Factions.push(new Faction({ name: 'New Faction' }))
  }

  public AddLocation() {
    this.Locations.push(new Location({ name: 'New Location' }))
  }

  public static Serialize(c: Campaign): ICampaignData {
    return {
      id: c.ID,
      name: c.Name,
      description: c.Description,
      sections: c.Sections.map(s => Section.Serialize(s)),
      characters: c.Characters.map(s => Character.Serialize(s)),
      locations: c.Locations.map(s => Location.Serialize(s)),
      factions: c.Factions.map(s => Faction.Serialize(s)),
    }
  }

  public static Deserialize(data: ICampaignData): Campaign {
    return new Campaign(data)
  }
}

export { ICampaignData, Campaign }