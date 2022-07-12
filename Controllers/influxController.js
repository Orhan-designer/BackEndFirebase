"use strict";

const db = require("../settings/mySqlDb");
const clientInflux = require("../settings/influxDb");
const { Point } = require("@influxdata/influxdb-client");

const tagsParams = {
  parameters: {
    software_version: "FW_rev_1_2_3",

    device_id: 123232,

    mq137_r0: 13.137,

    mq136_r0: 13.136,

    mq135_r0: 13.135,
  },

  telemetry: {
    temperature: 25,

    humidity: 60,

    sps30: {
      "pm1.0": 1.1,
      "pm2.5": 1.1,
      "pm4.0": 1.1,
      "pm10.0": 1.1,
      "nc0.5": 1.1,
      "nc0.5": 1.1,
      "nc1.0": 1.1,
      "nc2.5": 1.1,
      "nc4.0": 1.1,
      "nc10.0": 1.1,
      typical_size: 0.5,
    },

    h2s_ppm: 13.137,

    nh3_ppm: 13.136,

    co2_ppm: 13.135,
  },
};

let org = `alex@ar-sw.com`;
let bucket = `Salus`;

exports.getDataFromMySql = (req, res) => {
  //   let queryClient = clientInflux.getQueryApi(org)
  //   let fluxQuery = `from(bucket: "Salus")
  //  |> range(start: -3d)
  //  |> filter(fn: (r) => r._measurement == "farm first3")`

  //   queryClient.queryRows(fluxQuery, {
  //     next: (row, tableMeta) => {
  //       const tableObject = tableMeta.toObject(row)
  //       console.log(tableObject)
  //     },
  //     error: (error) => {
  //       console.error('\nError', error)
  //     },
  //     complete: () => {
  //       console.log('\nSuccess')
  //     },
  //   })

  const coops =
    "SELECT farm.ID as `farmId`, `Farm_Name`, coops.ID as `coopsId`, `Name`, `position`, `Device_ID` FROM `farm`, `coops`, `sensors` WHERE farm.ID = '" +
    req.body.id +
    "' AND '" +
    req.body.id +
    "' = coops.Farm_ID AND coops.ID = sensors.Coops_ID";

  db.query(coops, (error, results) => {
    if (error) {
      res.status(400).send({ message: error });
    } else {
      console.log(org, bucket)
      let writeClient = clientInflux.getWriteApi(org, bucket, "ns");

      results.forEach((item) => {
        console.log(item)
        let point = new Point(item.Farm_Name + item.farmId)
          .tag("software_version", "FW_rev_1_2_3")
          .tag("device_id", "123232")
          .tag("mq137_r0", "13.137")
          .tag("mq136_r0", "13.136")
          .tag("mq135_r0", "13.135")
          .tag("CoopName", item.Name)
          .tag('CoopId', item.coopsId)
          .tag("Farm_Name", item.Farm_Name)
          .tag('Farm_Id', item.farmId)
          .tag("position", item.position)
          .tag("DeviceId", item.Device_ID)
          .intField("temperature", 25)
          .intField("humidity", 60)
          .stringField(
            "sps30",
            JSON.stringify(
              '{ "pm1.0": 1.1, "pm2.5": 1.1, "pm4.0": 1.1, "pm10.0": 1.1, "nc0.5": 1.1, "nc0.5": 1.1, "nc1.0": 1.1, "nc2.5": 1.1, "nc4.0": 1.1, "nc10.0": 1.1, "typical_size": 0.5 }'
            )
          )
          .intField("h2s_ppm", 13.137)
          .intField("nh3_ppm", 13.136)
          .intField("co2_ppm", 13.135);
        writeClient.writePoint(point);
        writeClient.flush()
      });

      res.status(200).send({ result: results });
    }
  });
};
