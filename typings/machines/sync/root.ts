import {
  IState as IStateBase,
  IBind as IBindBase,
  IEmit as IEmitBase
} from 'asyncmachine/types'
import AsyncMachine from 'asyncmachine'

export { IBindBase, IEmitBase, AsyncMachine }

// ----- ----- ----- ----- -----
// STATE: Enabled
// ----- ----- ----- ----- -----

/** machine.bind('Enabled', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'Enabled_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'Enabled_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('Enabled', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'Enabled_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'Enabled_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  Enabled_enter /* param1: any?, param2: any? */?(): boolean | void
  Enabled_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: Initializing
// ----- ----- ----- ----- -----

/** machine.bind('Initializing', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'Initializing_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'Initializing_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('Initializing', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'Initializing_enter' /*, param1: any?, param2: any? */):
    | boolean
    | void
  (event: 'Initializing_state' /*, param1: any?, param2: any? */):
    | boolean
    | void
}

/** Method declarations */
export interface ITransitions {
  Initializing_enter /* param1: any?, param2: any? */?(): boolean | void
  Initializing_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: Ready
// ----- ----- ----- ----- -----

/** machine.bind('Ready', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'Ready_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'Ready_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('Ready', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'Ready_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'Ready_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  Ready_enter /* param1: any?, param2: any? */?(): boolean | void
  Ready_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: ConfigSet
// ----- ----- ----- ----- -----

/** machine.bind('ConfigSet', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'ConfigSet_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'ConfigSet_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('ConfigSet', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'ConfigSet_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'ConfigSet_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  ConfigSet_enter /* param1: any?, param2: any? */?(): boolean | void
  ConfigSet_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: SubsReady
// ----- ----- ----- ----- -----

/** machine.bind('SubsReady', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'SubsReady_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'SubsReady_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('SubsReady', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'SubsReady_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'SubsReady_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  SubsReady_enter /* param1: any?, param2: any? */?(): boolean | void
  SubsReady_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: SubsInited
// ----- ----- ----- ----- -----

/** machine.bind('SubsInited', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'SubsInited_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'SubsInited_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('SubsInited', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'SubsInited_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'SubsInited_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  SubsInited_enter /* param1: any?, param2: any? */?(): boolean | void
  SubsInited_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: Reading
// ----- ----- ----- ----- -----

/** machine.bind('Reading', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'Reading_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'Reading_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('Reading', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'Reading_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'Reading_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  Reading_enter /* param1: any?, param2: any? */?(): boolean | void
  Reading_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: ReadingDone
// ----- ----- ----- ----- -----

/** machine.bind('ReadingDone', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'ReadingDone_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'ReadingDone_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('ReadingDone', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'ReadingDone_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'ReadingDone_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  ReadingDone_enter /* param1: any?, param2: any? */?(): boolean | void
  ReadingDone_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: QuotaExceeded
// ----- ----- ----- ----- -----

/** machine.bind('QuotaExceeded', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'QuotaExceeded_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'QuotaExceeded_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('QuotaExceeded', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'QuotaExceeded_enter' /*, param1: any?, param2: any? */):
    | boolean
    | void
  (event: 'QuotaExceeded_state' /*, param1: any?, param2: any? */):
    | boolean
    | void
}

/** Method declarations */
export interface ITransitions {
  QuotaExceeded_enter /* param1: any?, param2: any? */?(): boolean | void
  QuotaExceeded_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: Writing
// ----- ----- ----- ----- -----

/** machine.bind('Writing', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'Writing_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'Writing_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('Writing', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'Writing_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'Writing_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  Writing_enter /* param1: any?, param2: any? */?(): boolean | void
  Writing_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: WritingDone
// ----- ----- ----- ----- -----

/** machine.bind('WritingDone', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'WritingDone_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'WritingDone_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('WritingDone', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'WritingDone_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'WritingDone_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  WritingDone_enter /* param1: any?, param2: any? */?(): boolean | void
  WritingDone_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: RestartingNetwork
// ----- ----- ----- ----- -----

/** machine.bind('RestartingNetwork', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'RestartingNetwork_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'RestartingNetwork_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('RestartingNetwork', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'RestartingNetwork_enter' /*, param1: any?, param2: any? */):
    | boolean
    | void
  (event: 'RestartingNetwork_state' /*, param1: any?, param2: any? */):
    | boolean
    | void
}

/** Method declarations */
export interface ITransitions {
  RestartingNetwork_enter /* param1: any?, param2: any? */?(): boolean | void
  RestartingNetwork_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: NetworkRestarted
// ----- ----- ----- ----- -----

/** machine.bind('NetworkRestarted', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'NetworkRestarted_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'NetworkRestarted_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('NetworkRestarted', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'NetworkRestarted_enter' /*, param1: any?, param2: any? */):
    | boolean
    | void
  (event: 'NetworkRestarted_state' /*, param1: any?, param2: any? */):
    | boolean
    | void
}

/** Method declarations */
export interface ITransitions {
  NetworkRestarted_enter /* param1: any?, param2: any? */?(): boolean | void
  NetworkRestarted_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: DBReady
// ----- ----- ----- ----- -----

/** machine.bind('DBReady', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'DBReady_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'DBReady_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('DBReady', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'DBReady_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'DBReady_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  DBReady_enter /* param1: any?, param2: any? */?(): boolean | void
  DBReady_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: HeartBeat
// ----- ----- ----- ----- -----

/** machine.bind('HeartBeat', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'HeartBeat_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'HeartBeat_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('HeartBeat', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'HeartBeat_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'HeartBeat_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  HeartBeat_enter /* param1: any?, param2: any? */?(): boolean | void
  HeartBeat_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- ----- ----- -----
// STATE: Scheduled
// ----- ----- ----- ----- -----

/** machine.bind('Scheduled', (param1, param2) => {}) */
export interface IBind extends IBindBase {
  (
    event: 'Scheduled_enter',
    listener: () => /* param1: any?, param2: any? */ boolean | undefined,
    context?: Object
  ): this
  (
    event: 'Scheduled_state',
    listener: () => /* param1: any?, param2: any? */ any,
    context?: Object
  ): this
}

/** machine.emit('Scheduled', param1, param2) */
export interface IEmit extends IEmitBase {
  (event: 'Scheduled_enter' /*, param1: any?, param2: any? */): boolean | void
  (event: 'Scheduled_state' /*, param1: any?, param2: any? */): boolean | void
}

/** Method declarations */
export interface ITransitions {
  Scheduled_enter /* param1: any?, param2: any? */?(): boolean | void
  Scheduled_state /* param1: any?, param2: any? */?():
    | boolean
    | void
    | Promise<boolean | void>
}

// ----- ----- -----
// GENERAL TYPES
// ----- ----- -----

/** All the possible transition methods the machine can define */
export interface ITransitions {
  Enabled_Any?(): boolean | void
  Enabled_Initializing?(): boolean | void
  Enabled_Ready?(): boolean | void
  Enabled_ConfigSet?(): boolean | void
  Enabled_SubsReady?(): boolean | void
  Enabled_SubsInited?(): boolean | void
  Enabled_Reading?(): boolean | void
  Enabled_ReadingDone?(): boolean | void
  Enabled_QuotaExceeded?(): boolean | void
  Enabled_Writing?(): boolean | void
  Enabled_WritingDone?(): boolean | void
  Enabled_RestartingNetwork?(): boolean | void
  Enabled_NetworkRestarted?(): boolean | void
  Enabled_DBReady?(): boolean | void
  Enabled_Exception?(): boolean | void
  Enabled_HeartBeat?(): boolean | void
  Enabled_Scheduled?(): boolean | void
  Enabled_Exception?(): boolean | void
  Enabled_exit?(): boolean | void
  Enabled_end?(): boolean | void | Promise<boolean | void>
  Initializing_Enabled?(): boolean | void
  Initializing_Any?(): boolean | void
  Initializing_Ready?(): boolean | void
  Initializing_ConfigSet?(): boolean | void
  Initializing_SubsReady?(): boolean | void
  Initializing_SubsInited?(): boolean | void
  Initializing_Reading?(): boolean | void
  Initializing_ReadingDone?(): boolean | void
  Initializing_QuotaExceeded?(): boolean | void
  Initializing_Writing?(): boolean | void
  Initializing_WritingDone?(): boolean | void
  Initializing_RestartingNetwork?(): boolean | void
  Initializing_NetworkRestarted?(): boolean | void
  Initializing_DBReady?(): boolean | void
  Initializing_Exception?(): boolean | void
  Initializing_HeartBeat?(): boolean | void
  Initializing_Scheduled?(): boolean | void
  Initializing_Exception?(): boolean | void
  Initializing_exit?(): boolean | void
  Initializing_end?(): boolean | void | Promise<boolean | void>
  Ready_Enabled?(): boolean | void
  Ready_Initializing?(): boolean | void
  Ready_Any?(): boolean | void
  Ready_ConfigSet?(): boolean | void
  Ready_SubsReady?(): boolean | void
  Ready_SubsInited?(): boolean | void
  Ready_Reading?(): boolean | void
  Ready_ReadingDone?(): boolean | void
  Ready_QuotaExceeded?(): boolean | void
  Ready_Writing?(): boolean | void
  Ready_WritingDone?(): boolean | void
  Ready_RestartingNetwork?(): boolean | void
  Ready_NetworkRestarted?(): boolean | void
  Ready_DBReady?(): boolean | void
  Ready_Exception?(): boolean | void
  Ready_HeartBeat?(): boolean | void
  Ready_Scheduled?(): boolean | void
  Ready_Exception?(): boolean | void
  Ready_exit?(): boolean | void
  Ready_end?(): boolean | void | Promise<boolean | void>
  ConfigSet_Enabled?(): boolean | void
  ConfigSet_Initializing?(): boolean | void
  ConfigSet_Ready?(): boolean | void
  ConfigSet_Any?(): boolean | void
  ConfigSet_SubsReady?(): boolean | void
  ConfigSet_SubsInited?(): boolean | void
  ConfigSet_Reading?(): boolean | void
  ConfigSet_ReadingDone?(): boolean | void
  ConfigSet_QuotaExceeded?(): boolean | void
  ConfigSet_Writing?(): boolean | void
  ConfigSet_WritingDone?(): boolean | void
  ConfigSet_RestartingNetwork?(): boolean | void
  ConfigSet_NetworkRestarted?(): boolean | void
  ConfigSet_DBReady?(): boolean | void
  ConfigSet_Exception?(): boolean | void
  ConfigSet_HeartBeat?(): boolean | void
  ConfigSet_Scheduled?(): boolean | void
  ConfigSet_Exception?(): boolean | void
  ConfigSet_exit?(): boolean | void
  ConfigSet_end?(): boolean | void | Promise<boolean | void>
  SubsReady_Enabled?(): boolean | void
  SubsReady_Initializing?(): boolean | void
  SubsReady_Ready?(): boolean | void
  SubsReady_ConfigSet?(): boolean | void
  SubsReady_Any?(): boolean | void
  SubsReady_SubsInited?(): boolean | void
  SubsReady_Reading?(): boolean | void
  SubsReady_ReadingDone?(): boolean | void
  SubsReady_QuotaExceeded?(): boolean | void
  SubsReady_Writing?(): boolean | void
  SubsReady_WritingDone?(): boolean | void
  SubsReady_RestartingNetwork?(): boolean | void
  SubsReady_NetworkRestarted?(): boolean | void
  SubsReady_DBReady?(): boolean | void
  SubsReady_Exception?(): boolean | void
  SubsReady_HeartBeat?(): boolean | void
  SubsReady_Scheduled?(): boolean | void
  SubsReady_Exception?(): boolean | void
  SubsReady_exit?(): boolean | void
  SubsReady_end?(): boolean | void | Promise<boolean | void>
  SubsInited_Enabled?(): boolean | void
  SubsInited_Initializing?(): boolean | void
  SubsInited_Ready?(): boolean | void
  SubsInited_ConfigSet?(): boolean | void
  SubsInited_SubsReady?(): boolean | void
  SubsInited_Any?(): boolean | void
  SubsInited_Reading?(): boolean | void
  SubsInited_ReadingDone?(): boolean | void
  SubsInited_QuotaExceeded?(): boolean | void
  SubsInited_Writing?(): boolean | void
  SubsInited_WritingDone?(): boolean | void
  SubsInited_RestartingNetwork?(): boolean | void
  SubsInited_NetworkRestarted?(): boolean | void
  SubsInited_DBReady?(): boolean | void
  SubsInited_Exception?(): boolean | void
  SubsInited_HeartBeat?(): boolean | void
  SubsInited_Scheduled?(): boolean | void
  SubsInited_Exception?(): boolean | void
  SubsInited_exit?(): boolean | void
  SubsInited_end?(): boolean | void | Promise<boolean | void>
  Reading_Enabled?(): boolean | void
  Reading_Initializing?(): boolean | void
  Reading_Ready?(): boolean | void
  Reading_ConfigSet?(): boolean | void
  Reading_SubsReady?(): boolean | void
  Reading_SubsInited?(): boolean | void
  Reading_Any?(): boolean | void
  Reading_ReadingDone?(): boolean | void
  Reading_QuotaExceeded?(): boolean | void
  Reading_Writing?(): boolean | void
  Reading_WritingDone?(): boolean | void
  Reading_RestartingNetwork?(): boolean | void
  Reading_NetworkRestarted?(): boolean | void
  Reading_DBReady?(): boolean | void
  Reading_Exception?(): boolean | void
  Reading_HeartBeat?(): boolean | void
  Reading_Scheduled?(): boolean | void
  Reading_Exception?(): boolean | void
  Reading_exit?(): boolean | void
  Reading_end?(): boolean | void | Promise<boolean | void>
  ReadingDone_Enabled?(): boolean | void
  ReadingDone_Initializing?(): boolean | void
  ReadingDone_Ready?(): boolean | void
  ReadingDone_ConfigSet?(): boolean | void
  ReadingDone_SubsReady?(): boolean | void
  ReadingDone_SubsInited?(): boolean | void
  ReadingDone_Reading?(): boolean | void
  ReadingDone_Any?(): boolean | void
  ReadingDone_QuotaExceeded?(): boolean | void
  ReadingDone_Writing?(): boolean | void
  ReadingDone_WritingDone?(): boolean | void
  ReadingDone_RestartingNetwork?(): boolean | void
  ReadingDone_NetworkRestarted?(): boolean | void
  ReadingDone_DBReady?(): boolean | void
  ReadingDone_Exception?(): boolean | void
  ReadingDone_HeartBeat?(): boolean | void
  ReadingDone_Scheduled?(): boolean | void
  ReadingDone_Exception?(): boolean | void
  ReadingDone_exit?(): boolean | void
  ReadingDone_end?(): boolean | void | Promise<boolean | void>
  QuotaExceeded_Enabled?(): boolean | void
  QuotaExceeded_Initializing?(): boolean | void
  QuotaExceeded_Ready?(): boolean | void
  QuotaExceeded_ConfigSet?(): boolean | void
  QuotaExceeded_SubsReady?(): boolean | void
  QuotaExceeded_SubsInited?(): boolean | void
  QuotaExceeded_Reading?(): boolean | void
  QuotaExceeded_ReadingDone?(): boolean | void
  QuotaExceeded_Any?(): boolean | void
  QuotaExceeded_Writing?(): boolean | void
  QuotaExceeded_WritingDone?(): boolean | void
  QuotaExceeded_RestartingNetwork?(): boolean | void
  QuotaExceeded_NetworkRestarted?(): boolean | void
  QuotaExceeded_DBReady?(): boolean | void
  QuotaExceeded_Exception?(): boolean | void
  QuotaExceeded_HeartBeat?(): boolean | void
  QuotaExceeded_Scheduled?(): boolean | void
  QuotaExceeded_Exception?(): boolean | void
  QuotaExceeded_exit?(): boolean | void
  QuotaExceeded_end?(): boolean | void | Promise<boolean | void>
  Writing_Enabled?(): boolean | void
  Writing_Initializing?(): boolean | void
  Writing_Ready?(): boolean | void
  Writing_ConfigSet?(): boolean | void
  Writing_SubsReady?(): boolean | void
  Writing_SubsInited?(): boolean | void
  Writing_Reading?(): boolean | void
  Writing_ReadingDone?(): boolean | void
  Writing_QuotaExceeded?(): boolean | void
  Writing_Any?(): boolean | void
  Writing_WritingDone?(): boolean | void
  Writing_RestartingNetwork?(): boolean | void
  Writing_NetworkRestarted?(): boolean | void
  Writing_DBReady?(): boolean | void
  Writing_Exception?(): boolean | void
  Writing_HeartBeat?(): boolean | void
  Writing_Scheduled?(): boolean | void
  Writing_Exception?(): boolean | void
  Writing_exit?(): boolean | void
  Writing_end?(): boolean | void | Promise<boolean | void>
  WritingDone_Enabled?(): boolean | void
  WritingDone_Initializing?(): boolean | void
  WritingDone_Ready?(): boolean | void
  WritingDone_ConfigSet?(): boolean | void
  WritingDone_SubsReady?(): boolean | void
  WritingDone_SubsInited?(): boolean | void
  WritingDone_Reading?(): boolean | void
  WritingDone_ReadingDone?(): boolean | void
  WritingDone_QuotaExceeded?(): boolean | void
  WritingDone_Writing?(): boolean | void
  WritingDone_Any?(): boolean | void
  WritingDone_RestartingNetwork?(): boolean | void
  WritingDone_NetworkRestarted?(): boolean | void
  WritingDone_DBReady?(): boolean | void
  WritingDone_Exception?(): boolean | void
  WritingDone_HeartBeat?(): boolean | void
  WritingDone_Scheduled?(): boolean | void
  WritingDone_Exception?(): boolean | void
  WritingDone_exit?(): boolean | void
  WritingDone_end?(): boolean | void | Promise<boolean | void>
  RestartingNetwork_Enabled?(): boolean | void
  RestartingNetwork_Initializing?(): boolean | void
  RestartingNetwork_Ready?(): boolean | void
  RestartingNetwork_ConfigSet?(): boolean | void
  RestartingNetwork_SubsReady?(): boolean | void
  RestartingNetwork_SubsInited?(): boolean | void
  RestartingNetwork_Reading?(): boolean | void
  RestartingNetwork_ReadingDone?(): boolean | void
  RestartingNetwork_QuotaExceeded?(): boolean | void
  RestartingNetwork_Writing?(): boolean | void
  RestartingNetwork_WritingDone?(): boolean | void
  RestartingNetwork_Any?(): boolean | void
  RestartingNetwork_NetworkRestarted?(): boolean | void
  RestartingNetwork_DBReady?(): boolean | void
  RestartingNetwork_Exception?(): boolean | void
  RestartingNetwork_HeartBeat?(): boolean | void
  RestartingNetwork_Scheduled?(): boolean | void
  RestartingNetwork_Exception?(): boolean | void
  RestartingNetwork_exit?(): boolean | void
  RestartingNetwork_end?(): boolean | void | Promise<boolean | void>
  NetworkRestarted_Enabled?(): boolean | void
  NetworkRestarted_Initializing?(): boolean | void
  NetworkRestarted_Ready?(): boolean | void
  NetworkRestarted_ConfigSet?(): boolean | void
  NetworkRestarted_SubsReady?(): boolean | void
  NetworkRestarted_SubsInited?(): boolean | void
  NetworkRestarted_Reading?(): boolean | void
  NetworkRestarted_ReadingDone?(): boolean | void
  NetworkRestarted_QuotaExceeded?(): boolean | void
  NetworkRestarted_Writing?(): boolean | void
  NetworkRestarted_WritingDone?(): boolean | void
  NetworkRestarted_RestartingNetwork?(): boolean | void
  NetworkRestarted_Any?(): boolean | void
  NetworkRestarted_DBReady?(): boolean | void
  NetworkRestarted_Exception?(): boolean | void
  NetworkRestarted_HeartBeat?(): boolean | void
  NetworkRestarted_Scheduled?(): boolean | void
  NetworkRestarted_Exception?(): boolean | void
  NetworkRestarted_exit?(): boolean | void
  NetworkRestarted_end?(): boolean | void | Promise<boolean | void>
  DBReady_Enabled?(): boolean | void
  DBReady_Initializing?(): boolean | void
  DBReady_Ready?(): boolean | void
  DBReady_ConfigSet?(): boolean | void
  DBReady_SubsReady?(): boolean | void
  DBReady_SubsInited?(): boolean | void
  DBReady_Reading?(): boolean | void
  DBReady_ReadingDone?(): boolean | void
  DBReady_QuotaExceeded?(): boolean | void
  DBReady_Writing?(): boolean | void
  DBReady_WritingDone?(): boolean | void
  DBReady_RestartingNetwork?(): boolean | void
  DBReady_NetworkRestarted?(): boolean | void
  DBReady_Any?(): boolean | void
  DBReady_Exception?(): boolean | void
  DBReady_HeartBeat?(): boolean | void
  DBReady_Scheduled?(): boolean | void
  DBReady_Exception?(): boolean | void
  DBReady_exit?(): boolean | void
  DBReady_end?(): boolean | void | Promise<boolean | void>
  Exception_Enabled?(): boolean | void
  Exception_Initializing?(): boolean | void
  Exception_Ready?(): boolean | void
  Exception_ConfigSet?(): boolean | void
  Exception_SubsReady?(): boolean | void
  Exception_SubsInited?(): boolean | void
  Exception_Reading?(): boolean | void
  Exception_ReadingDone?(): boolean | void
  Exception_QuotaExceeded?(): boolean | void
  Exception_Writing?(): boolean | void
  Exception_WritingDone?(): boolean | void
  Exception_RestartingNetwork?(): boolean | void
  Exception_NetworkRestarted?(): boolean | void
  Exception_DBReady?(): boolean | void
  Exception_HeartBeat?(): boolean | void
  Exception_Scheduled?(): boolean | void
  Exception_exit?(): boolean | void
  Exception_end?(): boolean | void | Promise<boolean | void>
  HeartBeat_Enabled?(): boolean | void
  HeartBeat_Initializing?(): boolean | void
  HeartBeat_Ready?(): boolean | void
  HeartBeat_ConfigSet?(): boolean | void
  HeartBeat_SubsReady?(): boolean | void
  HeartBeat_SubsInited?(): boolean | void
  HeartBeat_Reading?(): boolean | void
  HeartBeat_ReadingDone?(): boolean | void
  HeartBeat_QuotaExceeded?(): boolean | void
  HeartBeat_Writing?(): boolean | void
  HeartBeat_WritingDone?(): boolean | void
  HeartBeat_RestartingNetwork?(): boolean | void
  HeartBeat_NetworkRestarted?(): boolean | void
  HeartBeat_DBReady?(): boolean | void
  HeartBeat_Exception?(): boolean | void
  HeartBeat_Any?(): boolean | void
  HeartBeat_Scheduled?(): boolean | void
  HeartBeat_Exception?(): boolean | void
  HeartBeat_exit?(): boolean | void
  HeartBeat_end?(): boolean | void | Promise<boolean | void>
  Scheduled_Enabled?(): boolean | void
  Scheduled_Initializing?(): boolean | void
  Scheduled_Ready?(): boolean | void
  Scheduled_ConfigSet?(): boolean | void
  Scheduled_SubsReady?(): boolean | void
  Scheduled_SubsInited?(): boolean | void
  Scheduled_Reading?(): boolean | void
  Scheduled_ReadingDone?(): boolean | void
  Scheduled_QuotaExceeded?(): boolean | void
  Scheduled_Writing?(): boolean | void
  Scheduled_WritingDone?(): boolean | void
  Scheduled_RestartingNetwork?(): boolean | void
  Scheduled_NetworkRestarted?(): boolean | void
  Scheduled_DBReady?(): boolean | void
  Scheduled_Exception?(): boolean | void
  Scheduled_HeartBeat?(): boolean | void
  Scheduled_Any?(): boolean | void
  Scheduled_Exception?(): boolean | void
  Scheduled_exit?(): boolean | void
  Scheduled_end?(): boolean | void | Promise<boolean | void>
  Exception_Enabled?(): boolean | void
  Exception_Initializing?(): boolean | void
  Exception_Ready?(): boolean | void
  Exception_ConfigSet?(): boolean | void
  Exception_SubsReady?(): boolean | void
  Exception_SubsInited?(): boolean | void
  Exception_Reading?(): boolean | void
  Exception_ReadingDone?(): boolean | void
  Exception_QuotaExceeded?(): boolean | void
  Exception_Writing?(): boolean | void
  Exception_WritingDone?(): boolean | void
  Exception_RestartingNetwork?(): boolean | void
  Exception_NetworkRestarted?(): boolean | void
  Exception_DBReady?(): boolean | void
  Exception_HeartBeat?(): boolean | void
  Exception_Scheduled?(): boolean | void
  Exception_exit?(): boolean | void
  Exception_end?(): boolean | void | Promise<boolean | void>
}

/** All the state names */
export type TStates =
  | 'Enabled'
  | 'Initializing'
  | 'Ready'
  | 'ConfigSet'
  | 'SubsReady'
  | 'SubsInited'
  | 'Reading'
  | 'ReadingDone'
  | 'QuotaExceeded'
  | 'Writing'
  | 'WritingDone'
  | 'RestartingNetwork'
  | 'NetworkRestarted'
  | 'DBReady'
  | 'HeartBeat'
  | 'Scheduled'

/** All the transition names */
export type TTransitions =
  | 'Enabled_Any'
  | 'Enabled_Initializing'
  | 'Enabled_Ready'
  | 'Enabled_ConfigSet'
  | 'Enabled_SubsReady'
  | 'Enabled_SubsInited'
  | 'Enabled_Reading'
  | 'Enabled_ReadingDone'
  | 'Enabled_QuotaExceeded'
  | 'Enabled_Writing'
  | 'Enabled_WritingDone'
  | 'Enabled_RestartingNetwork'
  | 'Enabled_NetworkRestarted'
  | 'Enabled_DBReady'
  | 'Enabled_Exception'
  | 'Enabled_HeartBeat'
  | 'Enabled_Scheduled'
  | 'Enabled_Exception'
  | 'Enabled_exit'
  | 'Enabled_end'
  | 'Initializing_Enabled'
  | 'Initializing_Any'
  | 'Initializing_Ready'
  | 'Initializing_ConfigSet'
  | 'Initializing_SubsReady'
  | 'Initializing_SubsInited'
  | 'Initializing_Reading'
  | 'Initializing_ReadingDone'
  | 'Initializing_QuotaExceeded'
  | 'Initializing_Writing'
  | 'Initializing_WritingDone'
  | 'Initializing_RestartingNetwork'
  | 'Initializing_NetworkRestarted'
  | 'Initializing_DBReady'
  | 'Initializing_Exception'
  | 'Initializing_HeartBeat'
  | 'Initializing_Scheduled'
  | 'Initializing_Exception'
  | 'Initializing_exit'
  | 'Initializing_end'
  | 'Ready_Enabled'
  | 'Ready_Initializing'
  | 'Ready_Any'
  | 'Ready_ConfigSet'
  | 'Ready_SubsReady'
  | 'Ready_SubsInited'
  | 'Ready_Reading'
  | 'Ready_ReadingDone'
  | 'Ready_QuotaExceeded'
  | 'Ready_Writing'
  | 'Ready_WritingDone'
  | 'Ready_RestartingNetwork'
  | 'Ready_NetworkRestarted'
  | 'Ready_DBReady'
  | 'Ready_Exception'
  | 'Ready_HeartBeat'
  | 'Ready_Scheduled'
  | 'Ready_Exception'
  | 'Ready_exit'
  | 'Ready_end'
  | 'ConfigSet_Enabled'
  | 'ConfigSet_Initializing'
  | 'ConfigSet_Ready'
  | 'ConfigSet_Any'
  | 'ConfigSet_SubsReady'
  | 'ConfigSet_SubsInited'
  | 'ConfigSet_Reading'
  | 'ConfigSet_ReadingDone'
  | 'ConfigSet_QuotaExceeded'
  | 'ConfigSet_Writing'
  | 'ConfigSet_WritingDone'
  | 'ConfigSet_RestartingNetwork'
  | 'ConfigSet_NetworkRestarted'
  | 'ConfigSet_DBReady'
  | 'ConfigSet_Exception'
  | 'ConfigSet_HeartBeat'
  | 'ConfigSet_Scheduled'
  | 'ConfigSet_Exception'
  | 'ConfigSet_exit'
  | 'ConfigSet_end'
  | 'SubsReady_Enabled'
  | 'SubsReady_Initializing'
  | 'SubsReady_Ready'
  | 'SubsReady_ConfigSet'
  | 'SubsReady_Any'
  | 'SubsReady_SubsInited'
  | 'SubsReady_Reading'
  | 'SubsReady_ReadingDone'
  | 'SubsReady_QuotaExceeded'
  | 'SubsReady_Writing'
  | 'SubsReady_WritingDone'
  | 'SubsReady_RestartingNetwork'
  | 'SubsReady_NetworkRestarted'
  | 'SubsReady_DBReady'
  | 'SubsReady_Exception'
  | 'SubsReady_HeartBeat'
  | 'SubsReady_Scheduled'
  | 'SubsReady_Exception'
  | 'SubsReady_exit'
  | 'SubsReady_end'
  | 'SubsInited_Enabled'
  | 'SubsInited_Initializing'
  | 'SubsInited_Ready'
  | 'SubsInited_ConfigSet'
  | 'SubsInited_SubsReady'
  | 'SubsInited_Any'
  | 'SubsInited_Reading'
  | 'SubsInited_ReadingDone'
  | 'SubsInited_QuotaExceeded'
  | 'SubsInited_Writing'
  | 'SubsInited_WritingDone'
  | 'SubsInited_RestartingNetwork'
  | 'SubsInited_NetworkRestarted'
  | 'SubsInited_DBReady'
  | 'SubsInited_Exception'
  | 'SubsInited_HeartBeat'
  | 'SubsInited_Scheduled'
  | 'SubsInited_Exception'
  | 'SubsInited_exit'
  | 'SubsInited_end'
  | 'Reading_Enabled'
  | 'Reading_Initializing'
  | 'Reading_Ready'
  | 'Reading_ConfigSet'
  | 'Reading_SubsReady'
  | 'Reading_SubsInited'
  | 'Reading_Any'
  | 'Reading_ReadingDone'
  | 'Reading_QuotaExceeded'
  | 'Reading_Writing'
  | 'Reading_WritingDone'
  | 'Reading_RestartingNetwork'
  | 'Reading_NetworkRestarted'
  | 'Reading_DBReady'
  | 'Reading_Exception'
  | 'Reading_HeartBeat'
  | 'Reading_Scheduled'
  | 'Reading_Exception'
  | 'Reading_exit'
  | 'Reading_end'
  | 'ReadingDone_Enabled'
  | 'ReadingDone_Initializing'
  | 'ReadingDone_Ready'
  | 'ReadingDone_ConfigSet'
  | 'ReadingDone_SubsReady'
  | 'ReadingDone_SubsInited'
  | 'ReadingDone_Reading'
  | 'ReadingDone_Any'
  | 'ReadingDone_QuotaExceeded'
  | 'ReadingDone_Writing'
  | 'ReadingDone_WritingDone'
  | 'ReadingDone_RestartingNetwork'
  | 'ReadingDone_NetworkRestarted'
  | 'ReadingDone_DBReady'
  | 'ReadingDone_Exception'
  | 'ReadingDone_HeartBeat'
  | 'ReadingDone_Scheduled'
  | 'ReadingDone_Exception'
  | 'ReadingDone_exit'
  | 'ReadingDone_end'
  | 'QuotaExceeded_Enabled'
  | 'QuotaExceeded_Initializing'
  | 'QuotaExceeded_Ready'
  | 'QuotaExceeded_ConfigSet'
  | 'QuotaExceeded_SubsReady'
  | 'QuotaExceeded_SubsInited'
  | 'QuotaExceeded_Reading'
  | 'QuotaExceeded_ReadingDone'
  | 'QuotaExceeded_Any'
  | 'QuotaExceeded_Writing'
  | 'QuotaExceeded_WritingDone'
  | 'QuotaExceeded_RestartingNetwork'
  | 'QuotaExceeded_NetworkRestarted'
  | 'QuotaExceeded_DBReady'
  | 'QuotaExceeded_Exception'
  | 'QuotaExceeded_HeartBeat'
  | 'QuotaExceeded_Scheduled'
  | 'QuotaExceeded_Exception'
  | 'QuotaExceeded_exit'
  | 'QuotaExceeded_end'
  | 'Writing_Enabled'
  | 'Writing_Initializing'
  | 'Writing_Ready'
  | 'Writing_ConfigSet'
  | 'Writing_SubsReady'
  | 'Writing_SubsInited'
  | 'Writing_Reading'
  | 'Writing_ReadingDone'
  | 'Writing_QuotaExceeded'
  | 'Writing_Any'
  | 'Writing_WritingDone'
  | 'Writing_RestartingNetwork'
  | 'Writing_NetworkRestarted'
  | 'Writing_DBReady'
  | 'Writing_Exception'
  | 'Writing_HeartBeat'
  | 'Writing_Scheduled'
  | 'Writing_Exception'
  | 'Writing_exit'
  | 'Writing_end'
  | 'WritingDone_Enabled'
  | 'WritingDone_Initializing'
  | 'WritingDone_Ready'
  | 'WritingDone_ConfigSet'
  | 'WritingDone_SubsReady'
  | 'WritingDone_SubsInited'
  | 'WritingDone_Reading'
  | 'WritingDone_ReadingDone'
  | 'WritingDone_QuotaExceeded'
  | 'WritingDone_Writing'
  | 'WritingDone_Any'
  | 'WritingDone_RestartingNetwork'
  | 'WritingDone_NetworkRestarted'
  | 'WritingDone_DBReady'
  | 'WritingDone_Exception'
  | 'WritingDone_HeartBeat'
  | 'WritingDone_Scheduled'
  | 'WritingDone_Exception'
  | 'WritingDone_exit'
  | 'WritingDone_end'
  | 'RestartingNetwork_Enabled'
  | 'RestartingNetwork_Initializing'
  | 'RestartingNetwork_Ready'
  | 'RestartingNetwork_ConfigSet'
  | 'RestartingNetwork_SubsReady'
  | 'RestartingNetwork_SubsInited'
  | 'RestartingNetwork_Reading'
  | 'RestartingNetwork_ReadingDone'
  | 'RestartingNetwork_QuotaExceeded'
  | 'RestartingNetwork_Writing'
  | 'RestartingNetwork_WritingDone'
  | 'RestartingNetwork_Any'
  | 'RestartingNetwork_NetworkRestarted'
  | 'RestartingNetwork_DBReady'
  | 'RestartingNetwork_Exception'
  | 'RestartingNetwork_HeartBeat'
  | 'RestartingNetwork_Scheduled'
  | 'RestartingNetwork_Exception'
  | 'RestartingNetwork_exit'
  | 'RestartingNetwork_end'
  | 'NetworkRestarted_Enabled'
  | 'NetworkRestarted_Initializing'
  | 'NetworkRestarted_Ready'
  | 'NetworkRestarted_ConfigSet'
  | 'NetworkRestarted_SubsReady'
  | 'NetworkRestarted_SubsInited'
  | 'NetworkRestarted_Reading'
  | 'NetworkRestarted_ReadingDone'
  | 'NetworkRestarted_QuotaExceeded'
  | 'NetworkRestarted_Writing'
  | 'NetworkRestarted_WritingDone'
  | 'NetworkRestarted_RestartingNetwork'
  | 'NetworkRestarted_Any'
  | 'NetworkRestarted_DBReady'
  | 'NetworkRestarted_Exception'
  | 'NetworkRestarted_HeartBeat'
  | 'NetworkRestarted_Scheduled'
  | 'NetworkRestarted_Exception'
  | 'NetworkRestarted_exit'
  | 'NetworkRestarted_end'
  | 'DBReady_Enabled'
  | 'DBReady_Initializing'
  | 'DBReady_Ready'
  | 'DBReady_ConfigSet'
  | 'DBReady_SubsReady'
  | 'DBReady_SubsInited'
  | 'DBReady_Reading'
  | 'DBReady_ReadingDone'
  | 'DBReady_QuotaExceeded'
  | 'DBReady_Writing'
  | 'DBReady_WritingDone'
  | 'DBReady_RestartingNetwork'
  | 'DBReady_NetworkRestarted'
  | 'DBReady_Any'
  | 'DBReady_Exception'
  | 'DBReady_HeartBeat'
  | 'DBReady_Scheduled'
  | 'DBReady_Exception'
  | 'DBReady_exit'
  | 'DBReady_end'
  | 'Exception_Enabled'
  | 'Exception_Initializing'
  | 'Exception_Ready'
  | 'Exception_ConfigSet'
  | 'Exception_SubsReady'
  | 'Exception_SubsInited'
  | 'Exception_Reading'
  | 'Exception_ReadingDone'
  | 'Exception_QuotaExceeded'
  | 'Exception_Writing'
  | 'Exception_WritingDone'
  | 'Exception_RestartingNetwork'
  | 'Exception_NetworkRestarted'
  | 'Exception_DBReady'
  | 'Exception_HeartBeat'
  | 'Exception_Scheduled'
  | 'Exception_exit'
  | 'Exception_end'
  | 'HeartBeat_Enabled'
  | 'HeartBeat_Initializing'
  | 'HeartBeat_Ready'
  | 'HeartBeat_ConfigSet'
  | 'HeartBeat_SubsReady'
  | 'HeartBeat_SubsInited'
  | 'HeartBeat_Reading'
  | 'HeartBeat_ReadingDone'
  | 'HeartBeat_QuotaExceeded'
  | 'HeartBeat_Writing'
  | 'HeartBeat_WritingDone'
  | 'HeartBeat_RestartingNetwork'
  | 'HeartBeat_NetworkRestarted'
  | 'HeartBeat_DBReady'
  | 'HeartBeat_Exception'
  | 'HeartBeat_Any'
  | 'HeartBeat_Scheduled'
  | 'HeartBeat_Exception'
  | 'HeartBeat_exit'
  | 'HeartBeat_end'
  | 'Scheduled_Enabled'
  | 'Scheduled_Initializing'
  | 'Scheduled_Ready'
  | 'Scheduled_ConfigSet'
  | 'Scheduled_SubsReady'
  | 'Scheduled_SubsInited'
  | 'Scheduled_Reading'
  | 'Scheduled_ReadingDone'
  | 'Scheduled_QuotaExceeded'
  | 'Scheduled_Writing'
  | 'Scheduled_WritingDone'
  | 'Scheduled_RestartingNetwork'
  | 'Scheduled_NetworkRestarted'
  | 'Scheduled_DBReady'
  | 'Scheduled_Exception'
  | 'Scheduled_HeartBeat'
  | 'Scheduled_Any'
  | 'Scheduled_Exception'
  | 'Scheduled_exit'
  | 'Scheduled_end'
  | 'Exception_Enabled'
  | 'Exception_Initializing'
  | 'Exception_Ready'
  | 'Exception_ConfigSet'
  | 'Exception_SubsReady'
  | 'Exception_SubsInited'
  | 'Exception_Reading'
  | 'Exception_ReadingDone'
  | 'Exception_QuotaExceeded'
  | 'Exception_Writing'
  | 'Exception_WritingDone'
  | 'Exception_RestartingNetwork'
  | 'Exception_NetworkRestarted'
  | 'Exception_DBReady'
  | 'Exception_HeartBeat'
  | 'Exception_Scheduled'
  | 'Exception_exit'
  | 'Exception_end'

/** Typesafe state interface */
export interface IState extends IStateBase<TStates> {}

/** Subclassable typesafe state interface */
export interface IStateExt<T extends string> extends IStateBase<T | TStates> {}

export interface IBind extends IBindBase {
  // Non-params events and transitions
  (event: TTransitions, listener: () => boolean | void, context?: Object): this
}

export interface IEmit extends IEmitBase {
  // Non-params events and transitions
  (event: TTransitions): boolean | void
}

export interface IJSONStates {
  Enabled: IState
  Initializing: IState
  Ready: IState
  ConfigSet: IState
  SubsReady: IState
  SubsInited: IState
  Reading: IState
  ReadingDone: IState
  QuotaExceeded: IState
  Writing: IState
  WritingDone: IState
  RestartingNetwork: IState
  NetworkRestarted: IState
  DBReady: IState
  HeartBeat: IState
  Scheduled: IState
  Exception?: IState
}
