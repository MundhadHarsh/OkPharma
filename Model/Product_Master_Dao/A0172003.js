const conn = require('../../Connection/DB')


//SHOW ALL DATA IN A0172003

function listA017(req, res) {

  return new Promise((resolve, reject) => {
    conn.connection().then((conn) => {
    let qr = 'select top 5 AC_CODE,G_T,NAME,PACKING,BRN1_NO,ORD,RACK_NO,SRT,CLO_QTY,BarCode,PACKITEM,S_CODE,HSNCode,LSTPURCD,BRN1,Date from A0172003 ORDER BY AC_CODE DESC'

    conn.query(qr, (err, data) => {

      if (err) { console.log(err, 'errs'); }

      if (data) {

        console.log('Featch all data',);

        resolve(data);
        console.log(data)
        res.json(data.recordset)

      }

      else {
        resolve({ message: 'data not found' })
      }
    })

  })
})

}



//INSERT DATA IN A0172003  PENDING.......

function addA017(req, res) {

  return new Promise((resolve, reject) => {

    conn.connection().then((conn) => {
    let { CODE, G_T, NAME, PACKING, BRN1_NO, ORD, RACK_NO, SRT, CLO_QTY, BarCode, PACKITEM, S_CODE, HSNCode, LSTPURCD, BRN1, Date } = req.body;
  
    let qr = "insert into A0172003(CODE,G_T,NAME,PACKING,BRN1_NO,ORD,RACK_NO,SRT,CLO_QTY,BarCode,PACKITEM,S_CODE,HSNCode,LSTPURCD,BRN1,Date) VALUES ('" + CODE + "','" + G_T + "','" + NAME + "','" + PACKING + "','" + BRN1_NO + "','" + ORD + "','" + RACK_NO + "','" + SRT + "','" + CLO_QTY + "','" + BarCode + "','" + PACKITEM + "','" + S_CODE + "','" + HSNCode + "','" + LSTPURCD + "','" + BRN1 + "','" + Date + "')";

    conn.query(qr, (err, result) => {

      if (!err) {

        console.log('well its working',);

        resolve(result);

        res.send(result)
      }

      else {
        console.log('Data not found'); reject(err);
      }
    })
  })
})
}


//FIND DATA IN A0172003

function findA017byid(req, res) {

  let id = req.params.id;

  let qr2 = `select * from A0172003 where CODE= ${id}`

  return new Promise((resolve, reject) => {
    conn.connection().then((conn) => {
    conn.query(qr2, (err, result) => {

      if (err) {
        console.log("Data not Found")
        res.send("Data not Found")
        reject({ message: "Data not Found" })
      }

      else {

        resolve(result);

        console.log("Data Found")
        res.send(result)
      }
    })
  })
})

}

//FIND DATA choicewaise IN A0172003

function choicewaise(req, res) {


  let { id } = req.params;
  let { key } = req.params;

  let qr = "select * from A0172003 where " + id + " like '%" + key + "%'";
  conn.connection().then((conn) => {
  conn.query(qr, (error, result) => {

    if (error) {
      res.status(500).json(error);
    }
    else {
      res.status(201).json(result);
      console.log(result);
    }
  });
})
}


//DELETE DATA IN A0172003

function deleteA017byid(req, res) {

  let inve_no = req.params.id;

  const dt = `DELETE FROM A0172003 WHERE CODE =${inve_no}`
  conn.connection().then((conn) => {
  conn.query(dt, (err, result) => {
    if (result) {
      console.log("deleted");
      res.send("Delete of reecords : " + inve_no)
    }
    else {
      console.log('not');
      res.send("not")
    }
  })
})

}

//UPDATE DATA A0172003

function updateA017byid(req, res) {

  let code = req.params.id;

  let { G_T, NAME, PACKING, BRN1_NO, ORD, RACK_NO, SRT, CLO_QTY, BarCode, PACKITEM, S_CODE, HSNCode, LSTPURCD, BRN1, Date } = req.body;

  //Query

  let sql = `UPDATE A0172003 SET G_T='${G_T}',NAME='${NAME}',PACKING='${PACKING}',BRN1_NO='${BRN1_NO}',ORD='${ORD}',RACK_NO='${RACK_NO}',SRT='${SRT}',CLO_QTY='${CLO_QTY}',BarCode='${BarCode}',PACKITEM='${PACKITEM}',S_CODE='${S_CODE}',HSNCode='${HSNCode}',LSTPURCD='${LSTPURCD}',BRN1='${BRN1}',Date='${Date}' WHERE CODE ='${code}' `;

  conn.connection().then((conn) => {
  conn.query(sql, (err, result, fields) => {
    if (result) {
      console.log("Data Updated");
      res.send("Data Updated")
    }
    else {
      console.log(err);
      res.send(err)

    }
  })
})
}


module.exports = {
  addA017,
  listA017,
  findA017byid,
  choicewaise,
  deleteA017byid,
  updateA017byid
}