'use strict'

const clientInflux = require('./settings/influxDb');
const { Point } = require('@influxdata/influxdb-client')
const db = require("./../settings/mySqlDb");

const tagsParams = {
    "parameters": {

        "software_version": "FW_rev_1_2_3",

        "device_id": 123232,

        "mq137_r0": 13.137,

        "mq136_r0": 13.136,

        "mq135_r0": 13.135,

    }
}

// let org = `just.hanmamedov@gmail.com`
// let bucket = `ChikenHouse`

// let writeClient = clientInflux.getWriteApi(org, bucket, 'ns')

// let point = new Point('measurement1')
//     .tag('software_version', 'FW_rev_1_2_3')
//     .tag('"device_id', '123232,')
//     .tag('mq137_r0', '13.137')
//     .tag('mq136_r0', '13.136')
//     .tag('mq135_r0', '13.135')
//     // .tag('tagname1', 'tagvalue1')
//     // .tag('tagname1', 'tagvalue1')
//     // .tag('tagname1', 'tagvalue1')
//     // .tag('tagname1', 'tagvalue1')
//     .intField('field1', i)

// void setTimeout(() => {
//     writeClient.writePoint(point)
// }, i * 1000) // separate points by 1 second

// void setTimeout(() => {
//     writeClient.flush()
// }, 5000)


