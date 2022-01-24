import { getImagePath, ImageTag } from '@/io/ImageManagement'
import uuid from 'uuid/v4'
import { ItemType } from "../enums"
import { Clock, IClockData } from './Clock'
import { IRollableTableData, RollableTable } from './RollableTable'

interface ISectionData {
  header: string
  body: string
}

interface IRelationshipData {
  name: string,
  relationship: string
}

interface ICollectionItemData {
  id?: string
  name?: string
  description?: string
  notes?: string
  image?: string
  sections?: ISectionData[]
  characters?: IRelationshipData[]
  locations?: IRelationshipData[]
  factions?: IRelationshipData[]
  npcs?: IRelationshipData[]
  labels?: string[]
  clocks?: IClockData[]
  tables?: IRollableTableData[]
}

abstract class CollectionItem {
  public ID: string
  protected img: string
  public Name: string
  public Description: string
  public Notes: string
  public Sections: ISectionData[]
  public Characters: IRelationshipData[]
  public Locations: IRelationshipData[]
  public Factions: IRelationshipData[]
  public NPCs: IRelationshipData[]
  public Labels: string[]
  public Clocks: Clock[]
  public Tables: RollableTable[]
  public ItemType: ItemType

  public constructor(data?: ICollectionItemData) {
    this.ID = data?.id || uuid()
    this.img = data?.image || ''
    this.Name = data?.name || ''
    this.Description = data?.description || ''
    this.Notes = data?.notes || ''
    this.Sections = data?.sections || []
    this.Characters = data?.characters || []
    this.Locations = data?.locations || []
    this.Factions = data?.factions || []
    this.NPCs = data?.npcs || []
    this.Labels = data?.labels || []
    this.Clocks = data?.clocks ? data.clocks.map(c => new Clock(c)) : []
    this.Tables = data?.tables ? data.tables.map(t => new RollableTable(t)) : []
  }

  public RenewID() {
    this.ID = uuid()
  }

  public get Image(): string {
    if (this.img) return this.img
    else return getImagePath(ImageTag.Pilot, 'nodata.png')
  }

  public set Image(src: string) {
    this.img = src
  }

  public AddSection(s: ISectionData) {
    this.Sections.push(s)
  }

  public DeleteSection(s: ISectionData) {
    const idx = this.Sections.findIndex(x => x.body === s.body && x.header === s.header)
    if (idx === -1) return
    this.Sections.splice(idx, 1)
  }

  public AddClock(c?: IClockData) {
    this.Clocks.push(new Clock(c ? c : { title: 'New Clock' }))
  }

  public DeleteClock(c: Clock) {
    const idx = this.Clocks.findIndex(x => x.ID === c.ID)
    if (idx === -1) return
    this.Clocks.splice(idx, 1)
  }

  public AddTable(t?: IRollableTableData) {
    this.Tables.push(new RollableTable(t ? t : { title: 'New Table' }))
  }

  public DeleteTable(t: RollableTable) {
    const idx = this.Tables.findIndex(x => x.ID === t.ID)
    if (idx === -1) return
    this.Tables.splice(idx, 1)
  }

  public AddRelationship(type: string, r: IRelationshipData) {
    if (!Array.isArray(this[type])) return
    this[type].push(r)
  }

  public DeleteRelationship(type: string, r: IRelationshipData) {
    if (!Array.isArray(this[type])) return
    const idx = this[type].findIndex(x => r.name === x.name && r.relationship === x.relationship)
    if (idx === -1) return
    this[type].splice(idx, 1)
  }
}

export {
  ICollectionItemData,
  CollectionItem
}