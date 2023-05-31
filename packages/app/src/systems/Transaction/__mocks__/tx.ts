import { AddressType } from '@fuel-wallet/types';
import type {
  InputCoin,
  InputContract,
  InputMessage,
  OutputChange,
  OutputCoin,
  OutputContract,
  OutputContractCreated,
  OutputVariable,
  ReceiptReturn,
  ReceiptScriptResult,
  Transaction,
  TransactionResultCallReceipt,
  TransactionResultReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultScriptResultReceipt,
  TransactionResultTransferOutReceipt,
} from 'fuels';
import { ReceiptType, TransactionType, OutputType, InputType, bn } from 'fuels';

import type { Tx } from '../utils';
import { dateToTai64, OperationName, TxStatus, TxType } from '../utils';

type MockTransaction = {
  transaction: Transaction;
  tx: Tx;
  receipts: TransactionResultReceipt[];
};

export const createMockTx = ({
  status,
  time,
  id,
  operation,
}: {
  status?: TxStatus;
  time?: string;
  id?: string;
  operation?: OperationName;
}) => {
  return {
    ...MOCK_TRANSACTION_CONTRACT_CALL.tx,
    time: time ?? MOCK_TRANSACTION_CONTRACT_CALL.tx.time,
    id: id ?? MOCK_TRANSACTION_CONTRACT_CALL.tx.id,
    status: status ?? MOCK_TRANSACTION_CONTRACT_CALL.tx.status,
    operations: [
      {
        ...MOCK_TRANSACTION_CONTRACT_CALL.tx.operations[0],
        name: operation ?? MOCK_TRANSACTION_CONTRACT_CALL.tx.operations[0].name,
      },
      ...MOCK_TRANSACTION_CONTRACT_CALL.tx.operations.slice(1),
    ],
  };
};

export const MOCK_TRANSACTION_CONTRACT_CALL_PARTS: {
  inputContract: InputContract;
  inputCoin: InputCoin;
  outputContract: OutputContract;
  outputVariable: OutputVariable;
  outputChange: OutputChange;
  receiptCall: TransactionResultCallReceipt;
  receiptTransferOut: TransactionResultTransferOutReceipt;
  receiptReturnData: TransactionResultReturnDataReceipt[];
  receiptScriptResult: TransactionResultScriptResultReceipt;
} = {
  inputCoin: {
    amount: bn(4999989993),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    maturity: 0,
    owner: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
    predicate: '0x',
    predicateData: '0x',
    predicateDataLength: 0,
    predicateLength: 0,
    txPointer: { blockHeight: 0, txIndex: 0 },
    type: InputType.Coin,
    utxoID: {
      transactionId:
        '0xf23da6e1d6a55d05f2a0ebbb90b6b161d9e70f1723680f610f08c98279bc6855',
      outputIndex: 1,
    },
    witnessIndex: 0,
  },
  inputContract: {
    balanceRoot:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    contractID:
      '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
    stateRoot:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    txPointer: {
      blockHeight: 0,
      txIndex: 0,
    },
    type: InputType.Contract,
    utxoID: {
      outputIndex: 0,
      transactionId:
        '0xf23da6e1d6a55d05f2a0ebbb90b6b161d9e70f1723680f610f08c98279bc6855',
    },
  },
  outputContract: {
    type: OutputType.Contract,
    inputIndex: 0,
    balanceRoot:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    stateRoot:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
  outputChange: {
    type: OutputType.Change,
    to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
    amount: bn(4899989992),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
  outputVariable: {
    type: OutputType.Variable,
    to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
    amount: bn(100000000),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
  receiptCall: {
    type: ReceiptType.Call,
    from: '0x0000000000000000000000000000000000000000000000000000000000000000',
    to: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
    amount: bn(100000000),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    gas: bn('0x5f56dca'),
    param1: bn('0x2b859553'),
    param2: bn('0x3'),
    pc: bn('0x4370'),
    is: bn('0x4370'),
  },
  receiptTransferOut: {
    type: ReceiptType.TransferOut,
    from: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
    to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
    amount: bn(100000000),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    pc: bn('0x57dc'),
    is: bn('0x4370'),
  },
  receiptReturnData: [
    {
      type: ReceiptType.ReturnData,
      id: '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
      ptr: bn('0x66e0'),
      len: bn('0x58'),
      digest:
        '0x2ff699ad2d07577eef288783f7a7d4f41f8e8837178c42f603a2f8799145a053',
      pc: bn('0x58'),
      is: bn('0x3'),
      data: '0x000000000000000300000000000000050000000005f5e10000000000000000003e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b23024d79206576656e7400000000000000000000000000000001',
    },
    {
      type: ReceiptType.ReturnData,
      id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      ptr: bn('0x3fffd70'),
      len: bn('0xf8'),
      digest:
        '0x31120b8025b758fa96c911171d8211e53eb256f2ecc9b45c657c0ddfe6241ef5',
      pc: bn('0xf8'),
      is: bn('0x1'),
      data: '0x000000000000000100000000000000010000000000000000000000000000005800000000000000000000000005f563ca00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c400000000005f5e1000000000000003d1800000000000000000000000000003c9000000000000035980000000000003ae8000000000000000300000000000000050000000005f5e10000000000000000003e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b23024d79206576656e7400000000000000000000000000000001',
    },
  ],
  receiptScriptResult: {
    type: ReceiptType.ScriptResult,
    result: bn(0),
    gasUsed: bn(167824),
  },
};

const thirtyFourDaysAgo = dateToTai64(
  new Date(Date.now() - 1000 * 60 * 60 * 24 * 34)
);
export const MOCK_TRANSACTION_CONTRACT_CALL: MockTransaction = {
  transaction: {
    gasLimit: bn(100000000),
    gasPrice: bn(1),
    inputsCount: 3,
    inputs: [
      MOCK_TRANSACTION_CONTRACT_CALL_PARTS.inputContract,
      MOCK_TRANSACTION_CONTRACT_CALL_PARTS.inputCoin,
    ],
    outputsCount: 3,
    outputs: [
      MOCK_TRANSACTION_CONTRACT_CALL_PARTS.outputContract,
      MOCK_TRANSACTION_CONTRACT_CALL_PARTS.outputVariable,
      MOCK_TRANSACTION_CONTRACT_CALL_PARTS.outputChange,
    ],
    receiptsRoot:
      '0x80fc095e6c66a2deb42087bd63e5490f79b650d2cd245f7771e6bae51dcd4aec',
    script:
      '0x90000004470000000000000000000cd45dfcc00110fff3001a5c5000910005b861440006724002d0164114005b40100d360000006158000c61440001504175305f5d10a6504175305d4570a6504171385f5d1027504171385d417027134100007340001a9000001f1a445000910000085d43f0005f4500009000002b504171385d4170271341004073400024900000291a445000910000085d43f0015f4500009000002b360000001a44000050417528504175286041100850457528504170085041700860411008504170085d4100001341000073400037900000396144000c9000003b360000001a440000504174305f5d1086504174305d4570865d43f00210450440504174485f5d108961440001504175405f5d10a8504175405d4570a8504171405f5d1028504171405d417028134100007340004f900000541a445000910000085d43f0005f45000090000060504171405d41702813410040734000599000005e1a445000910000085d43f0015f45000090000060360000001a44000050417538504175386041100850457538504170005041700060411008504170005d410000134100007340006c9000006e6144000690000078504170005d410000134100407340007390000076360000001a44000090000078360000001a4400005d43f00220451400504173805f5d1070504174485d497089504173805d4170701a445000910000105f4520005f450001504175a8504175a8604110105d47f00326440000504470015041726050417260604110a026000000504070011a445000910000105f4500005f440001504174785041747860411010504173505f5c006a5d47f0025d43f00412451400504173005f5d1060504173505d45706a504173005d41706016411400734000a4900000b150496000504173505d41706a5545009010452440504170785041707860411090504170785d41000013410040734001249000031f504972601a445000910000a050411000604120a05041748850417488604110a026000000504070011a445000910000105f4500005f44000150417198504171986041101050517198505574885d454001504174085f5d10815d4540015d43f00310450440504173c85f5d10795d4140005d4d4001504573c85d457079154914c0734800d3900000e12644000050487001504573a85f5d207515453000734400da900000de504573a85d457075284504c0900000de504173a85d417075900000e15f510000504173c85d4170795f5100015d454000504174085d417081104504405d43f0032845540050557198505174785d41400113410000734000f1900000f35d4150019000011c5d455001504174105f5d10825d4550015d41400110450440504173d05f5d107a5d4150005d4d5001504573d05d45707a154914c073480102900001102644000050487001504573b05f5d207615453000734401099000010d504573b05d457076284504c09000010d504173b05d417076900001105f550000504173d05d41707a5f5500015d4940005d455000504174105d417082104504405d414001284524005d417082504171985d450000504171985d41000125450000504574885d43f003254500005041707850450008504171a8504171a860411088504171a850450028504171085041710860411018504171085d41000013410000734001339000013f504171085d450002504175485f5d10a9504175485d4970a91a445000910000185d43f0005f4500005f4520029000017b504171085d41000013410040734001449000016050417108504100085d450000504173e85f5d107d50417108504100085d450001504173785f5d106f504175a85d450000504173e85d41707d10450440504173785d41706f1a485000910000105f4910005f4900011a445000910000185d43f0015f45000050411008604120109000017b50417108504100085d450000504173f05f5d107e50417108504100085d450001504173905f5d1072504175a85d450000504173f05d41707e10450440504173905d4170721a485000910000105f4910005f4900011a445000910000185d43f0015f4500005041100860412010504173085041730860411018504171a850550000504171a85d51000450457308504171a8504d0040504170105041701060411018504170105d410000134100007340018d90000194504170105d450002504175505f5d10aa504175505d4570aa900001a8504170105d4100001341004073400199900001a150417010504100085d450000504174385f5d1087504174385d457087900001a850417010504100085d450000504174505f5d108a504174505d45708a504173205f5d1064504173205d4970641a4450009100003050411000604150205f4540045f45200550417230504172306041103050453000504170285041702860411010504170285d41000013410040734001be900001c5504170285d450001504171485f5d1029504171485d457029900001cd504170285d41000013410000734001ca900001cc1a440000900001cd1a440000504171505f5d102a50453010504170385041703860411028504170385d41000013410040734001d8900001df504170385045000850417358504173586041102050497358900001f1504170385d41000013410000734001e4900001eb1a485000910000205d47f00a104513005041200060411020900001f11a485000910000205d47f00a10451300504120006041102050417158504171586041202050453038504170605041706060411010504170605d41000013410040734001fd90000204504170605d450001504173405f5d1068504173405d4570689000020c504170605d41000013410000734002099000020b1a44a0009000020c1a44a000504173485f5d1069504d7230504171505d49702a50457158504173485d4170692d4d24501a44e000504170705f5d100e504170705d41700e134100007340021d900002281a44d000504175785f5d10af504175785d4570af1a485000910000185d43f0005f4900005f4910029000023d504170705d45700e504173885f5d10711a44d000504174585f5d108b504174585d49708b504173885d4170711a445000910000105f4520005f4500011a485000910000185d43f0015f490000504120086041101050417460504174606041201850457460504171205041712060411018504171205d410000134100007340024990000255504171205d450002504175a05f5d10b4504175a05d4970b41a445000910000185d43f0005f4500005f45200290000309504171205d410000134100407340025a900002b250417120504100085d450000504174285f5d108550417120504100085d450001504173985f5d1073504174285d497085504173985d4170731a445000910000105f4520005f45000150417178504171786041101050557478505171785d4140011341000073400275900002775d455001900002a15d455001504174185f5d10835d4550015d41400110450440504173d85f5d107b5d4150005d4d5001504573d85d45707b154914c073480286900002942644000050487001504573b85f5d2077154530007344028d90000291504573b85d457077284504c090000291504173b85d417077900002945f550000504173d85d41707b5f5500015d4940005d455000504174185d417083104504405d41400128452400504174185d457083504173f85f5d107f504173f85d45707f504173985d4170731a485000910000105f4910005f4900011a445000910000185d43f0015f45000050411008604120109000030950417120504100085d450000504174405f5d108850417120504100085d450001504173a05f5d1074504174405d497088504173a05d4170741a445000910000105f4520005f45000150417188504171886041101050557478505171885d41400113410000734002cd900002cf5d455001900002f95d455001504174205f5d10845d4550015d41400110450440504173e05f5d107c5d4150005d4d5001504573e05d45707c154914c0734802de900002ec2644000050487001504573c05f5d207815453000734402e5900002e9504573c05d457078284504c0900002e9504173c05d417078900002ec5f550000504173e05d41707c5f5500015d4940005d455000504174205d417084104504405d41400128452400504174205d457084504174005f5d1080504174005d457080504173a05d4170741a485000910000105f4910005f4900011a445000910000185d43f0015f4500005041100860412010504173285041732860411018504973281a445000910000205d43f0015f450000504110086041201850417558504175586041102050457260504173505d41706a5549002010491480504575585d43f009284914009000032e504175801a445000910000205d43f0005f450000504175806041102050457260504173505d41706a5549002010491480504575805d43f0092849140050417350504173505d41706a104014005f5d006a9000009d470000000000000000000000000000000000000100000000000002d000000000000000a00000000000000090000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000cfc',
    scriptData:
      '0x00000000000000010a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1000000002b85955300000000000000000000000000000000000000000000000300000000000000010000000005f5e1000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    scriptDataLength: 720,
    scriptLength: 3372,
    type: TransactionType.Script,
  },
  tx: {
    id: '0x18617ccc580478214175c4daba11903df93a66a94aada773e80411ed06b6ade7',
    operations: [
      {
        name: OperationName.contractCall,
        from: {
          type: AddressType.account,
          address:
            '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        },
        to: {
          type: AddressType.contract,
          address:
            '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
        },
        assetsSent: [
          {
            amount: bn(100000000),
            assetId:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
          },
        ],
      },
      {
        name: OperationName.contractTransfer,
        from: {
          type: AddressType.contract,
          address:
            '0x0a98320d39c03337401a4e46263972a9af6ce69ec2f35a5420b1bd35784c74b1',
        },
        to: {
          type: AddressType.account,
          address:
            '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        },
        assetsSent: [
          {
            amount: bn(100000000),
            assetId:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
          },
        ],
      },
    ],
    gasUsed: bn('0x28f90'),
    fee: bn('0x1'),
    type: TxType.script,
    status: TxStatus.success,
    isTypeMint: false,
    isTypeCreate: false,
    isTypeScript: true,
    isStatusPending: false,
    isStatusSuccess: true,
    isStatusFailure: false,
    time: thirtyFourDaysAgo,
  },
  receipts: [
    MOCK_TRANSACTION_CONTRACT_CALL_PARTS.receiptCall,
    MOCK_TRANSACTION_CONTRACT_CALL_PARTS.receiptTransferOut,
    ...MOCK_TRANSACTION_CONTRACT_CALL_PARTS.receiptReturnData,
    MOCK_TRANSACTION_CONTRACT_CALL_PARTS.receiptScriptResult,
  ],
};

export const MOCK_TRANSACTION_CREATE_CONTRACT_PARTS: {
  inputCoin: InputCoin;
  outputContractCreated: OutputContractCreated;
  outputChange: OutputChange;
} = {
  inputCoin: {
    type: InputType.Coin,
    utxoID: {
      transactionId:
        '0x1501d55926c33878ec8c02f1cf57e0b1f7d0617685dcd14109fbe0b0c228aebd',
      outputIndex: 1,
    },
    owner: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
    amount: bn(4999989999),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    txPointer: { blockHeight: 0, txIndex: 0 },
    witnessIndex: 1,
    maturity: 0,
    predicateLength: 0,
    predicateDataLength: 0,
    predicate: '0x',
    predicateData: '0x',
  },
  outputContractCreated: {
    type: OutputType.ContractCreated,
    contractId:
      '0xef066899413ef8dc7c3073a50868bafb3d039d9bad8006c2635b7f0efa992553',
    stateRoot:
      '0x1494a821f0dac0da6978dd03fbb5d02910d184a17cb7ff895fc0aa750bab88ea',
  },
  outputChange: {
    type: OutputType.Change,
    to: '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
    amount: bn(4999989998),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
};

export const MOCK_TRANSACTION_CREATE_CONTRACT: MockTransaction = {
  transaction: {
    type: TransactionType.Create,
    gasPrice: bn(1),
    gasLimit: bn(100000000),
    maturity: 0,
    bytecodeLength: 65,
    bytecodeWitnessIndex: 0,
    storageSlotsCount: 1,
    inputsCount: 2,
    outputsCount: 2,
    witnessesCount: 2,
    salt: '0x0000000000000000000000000000000000000000000000000000000000000000',
    storageSlots: [
      {
        key: '0xf383b0ce51358be57daa3b725fe44acdb2d880604e367199080b4379c41bb6ed',
        value:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
    ],
    inputs: [
      MOCK_TRANSACTION_CREATE_CONTRACT_PARTS.inputCoin,
      MOCK_TRANSACTION_CREATE_CONTRACT_PARTS.inputCoin,
    ],
    outputs: [
      MOCK_TRANSACTION_CREATE_CONTRACT_PARTS.outputContractCreated,
      MOCK_TRANSACTION_CREATE_CONTRACT_PARTS.outputChange,
    ],
    witnesses: [
      {
        dataLength: 260,
        data: '0x900000044700000000000000000000cc5dfcc00110fff3005d4060495d47f004134904407348000f5d47f005134904407348001972f0007b36f000001a48500091000020504120005d47f0061045130050412000604110205041200038450400244400005d40604a1a4c500091000060504530005d4bf006104923005045300060452020504530003849144010492400504130205d47f006104513005041302060411020504130203a410480504130405d47f006104513005041304060411020504130403845040024440000f383b0ce51358be57daa3b725fe44acdb2d880604e367199080b4379c41bb6ed0000000013ddc66f00000000e543c66600000000000000cc',
      },
      {
        dataLength: 64,
        data: '0x355b738c4f9817a9412a6497443f26d549b6ed68a3a7e9bb21a76cdb7519a70d17e485da627b2cb65c9cf0d15f7dfdfa62042321252d2e1e650e67adbc1729c7',
      },
    ],
  },
  tx: {
    id: '0x755fecd0059b835efbcd0e647590c38f87b95ca062ec978f28a085042c05e3a9',
    operations: [
      {
        name: OperationName.contractCreated,
        from: {
          type: AddressType.account,
          address:
            '0x3e7ddda4d0d3f8307ae5f1aed87623992c1c4decefec684936960775181b2302',
        },
        to: {
          type: AddressType.contract,
          address:
            '0xef066899413ef8dc7c3073a50868bafb3d039d9bad8006c2635b7f0efa992553',
        },
      },
    ],
    gasUsed: bn(1),
    fee: bn(1),
    isTypeCreate: true,
    isTypeScript: false,
    isTypeMint: false,
    isStatusFailure: false,
    isStatusSuccess: true,
    isStatusPending: false,
    type: TxType.create,
    status: TxStatus.success,
  },
  receipts: [],
};

export const MOCK_TRANSACTION_MINT_PARTS: {
  outputCoin: OutputCoin;
} = {
  outputCoin: {
    type: OutputType.Coin,
    to: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
    amount: bn(1),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
};

export const MOCK_TRANSACTION_MINT: MockTransaction = {
  transaction: {
    type: TransactionType.Mint,
    outputsCount: 1,
    outputs: [MOCK_TRANSACTION_MINT_PARTS.outputCoin],
    txPointer: { blockHeight: 417311, txIndex: 0 },
  },
  tx: {
    id: '0xc321cc16ea5c387c780d5d3061e1ddb5a94574dac0f79215f3ff3abf9c2fb3a0',
    operations: [
      {
        name: OperationName.payBlockProducer,
        from: { type: AddressType.account, address: 'Network' },
        to: {
          type: AddressType.account,
          address:
            '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
        },
        assetsSent: [
          {
            assetId:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
            amount: bn(1),
          },
        ],
      },
    ],
    gasUsed: bn(0),
    fee: bn(0),
    isTypeCreate: false,
    isTypeScript: false,
    isTypeMint: true,
    isStatusFailure: false,
    isStatusSuccess: true,
    isStatusPending: false,
    type: TxType.mint,
    status: TxStatus.success,
  },
  receipts: [],
};

export const MOCK_TRANSACTION_TRANSFER_PARTS: {
  inputCoin: InputCoin;
  inputMessage: InputMessage;
  outputCoin: OutputCoin;
  outputChange: OutputChange;
  receiptReturn: ReceiptReturn;
  receiptScriptResult: ReceiptScriptResult;
} = {
  inputCoin: {
    type: InputType.Coin,
    utxoID: {
      transactionId:
        '0x0dbd3bd53580b647a74ca5825b5b70a44b9b780e8fc6fa40faa080f0da971ec4',
      outputIndex: 0,
    },
    owner: '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b',
    amount: bn('500000000'),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    txPointer: { blockHeight: 0, txIndex: 0 },
    witnessIndex: 0,
    maturity: 0,
    predicateLength: 0,
    predicateDataLength: 0,
    predicate: '0x',
    predicateData: '0x',
  },
  inputMessage: {
    amount: bn.parseUnits('0.001'),
    data: '0x',
    dataLength: 0,
    nonce: bn(2),
    predicate: '0x',
    predicateData: '0x',
    predicateDataLength: 0,
    predicateLength: 0,
    recipient:
      '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b',
    sender:
      '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    type: InputType.Message,
    witnessIndex: 0,
  },
  outputCoin: {
    type: OutputType.Coin,
    to: '0x1c78a0266f7e10eb47872f0dc60a984625d01635c2723d61dccb9f555702a410',
    amount: bn(10000),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
  outputChange: {
    type: OutputType.Change,
    to: '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b',
    amount: bn('499989999'),
    assetId:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
  receiptReturn: {
    type: ReceiptType.Return,
    id: '0x0000000000000000000000000000000000000000000000000000000000000000',
    val: bn(0),
    pc: bn('0x2868'),
    is: bn('0x2868'),
  },
  receiptScriptResult: {
    type: ReceiptType.ScriptResult,
    result: bn(0),
    gasUsed: bn(1335),
  },
};

export const MOCK_TRANSACTION_TRANSFER: MockTransaction = {
  transaction: {
    type: 0,
    gasPrice: bn(1),
    gasLimit: bn(100000000),
    maturity: 0,
    scriptLength: 4,
    scriptDataLength: 0,
    inputsCount: 2,
    outputsCount: 2,
    witnessesCount: 1,
    receiptsRoot:
      '0x38f46cc362f2ec2df7d2691a6dd07594eeb4c6ffa7f3cbd7ccacab9eacb56ca1',
    script: '0x24000000',
    scriptData: '0x',
    inputs: [
      // here we don't have inputs. they should be defined in next mocks (from coin or message)
    ],
    outputs: [
      MOCK_TRANSACTION_TRANSFER_PARTS.outputCoin,
      MOCK_TRANSACTION_TRANSFER_PARTS.outputChange,
    ],
    witnesses: [
      {
        dataLength: 64,
        data: '0x1ba88dd34e7ed26312f88de00fa23761ce26aafe963e171011d9e8f8b47a5ac154ee2def875fb0c4b3cab7428deedfd54e38ff4a61ac38ee7f9da72523e31a6b',
      },
    ],
  },
  tx: {
    id: '0xdcbd3117aab0ec4a9a00f4a0f81616878140dccc3046b8fc4510fa2181d955e7',
    operations: [
      {
        name: OperationName.transfer,
        from: {
          type: AddressType.account,
          address:
            '0x06300e686a5511c7ba0399fc68dcbe0ca2d8f54f7e6afea73c505dd3bcacf33b',
        },
        to: {
          type: AddressType.account,
          address:
            '0x1c78a0266f7e10eb47872f0dc60a984625d01635c2723d61dccb9f555702a410',
        },
        assetsSent: [
          {
            assetId:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
            amount: bn(10000),
          },
        ],
      },
    ],
    gasUsed: bn(1335),
    fee: bn(1),
    isTypeCreate: false,
    isTypeScript: true,
    isTypeMint: false,
    isStatusFailure: false,
    isStatusSuccess: true,
    isStatusPending: false,
    type: TxType.script,
    status: TxStatus.success,
  },
  receipts: [
    MOCK_TRANSACTION_TRANSFER_PARTS.receiptReturn,
    MOCK_TRANSACTION_TRANSFER_PARTS.receiptScriptResult,
  ],
};

export const MOCK_TRANSACTION_TRANSFER_FROM_COIN: MockTransaction = {
  ...MOCK_TRANSACTION_TRANSFER,
  transaction: {
    ...MOCK_TRANSACTION_TRANSFER.transaction,
    inputs: [
      MOCK_TRANSACTION_TRANSFER_PARTS.inputCoin,
      MOCK_TRANSACTION_TRANSFER_PARTS.inputCoin,
    ],
  },
};

export const MOCK_TRANSACTION_TRANSFER_FROM_MESSAGE: MockTransaction = {
  ...MOCK_TRANSACTION_TRANSFER,
  transaction: {
    ...MOCK_TRANSACTION_TRANSFER.transaction,
    inputs: [
      MOCK_TRANSACTION_TRANSFER_PARTS.inputMessage,
      MOCK_TRANSACTION_TRANSFER_PARTS.inputMessage,
    ],
  },
};

export const MOCK_GAS_PER_BYTE = bn(4);
export const MOCK_GAS_PRICE_FACTOR = bn(1000000000);
