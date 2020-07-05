
findDupesWithJoin()


function findDupesWithJoin() {


  var count = 0;
  var idx = 0;
  var lmt = 500;
  var debug = true;
  var nameHash  = {};


  var nmgr = new GlideRecord('cmdb_ci_server');
  nmgr.addEncoded('name!=NULL^serial_number!=NULL');
  nmgr.groupBy('name');
  if (debug) nmgr.setLimit(lmt);
  nmgr.query();


  while(nmgr.next()) {
     if (!( String(nmgr.name) in nameHash )) nameHash[String(nmgr.name)] = String(nmgr.name) 
   }

  for ( key in nameHash) {


    var cigr = new GlideRecord('cmdb_ci_server')
    cigr.addQuery('name',key)
    cigr.setLimit(1)
    cigr.query()
    while(cigr.next()){

      var gr = new GlideRecord('cmdb_ci');
      var grSQ = gr.addJoinQuery('cmdb_ci_server');
 
      gr.addQuery('name', cigr.name);
      gr.addQuery('serial_number',cigr.serial_number)
      gr.addQuery('ip_address',cigr.ip_address)
      gr.addQuery('sys_class_name',cigr.sys_class_name)


 
      grSQ.addCondition('name', cigr.name);
      grSQ.addCondition('serial_number',cigr.serial_number)
      grSQ.addCondition('ip_address',cigr.ip_address)
      grSQ.addCondition('sys_class_name',cigr.sys_class_name)
     // Query
     gr.query();
 
    // Iterate and print results
    while (gr.next()) {
         if( gr.getRowCount() > 1) gs.print(gr.getValue('name') + " " + String(gr.getValue('serial_number')).trim() + " " +  gr.getValue('ip_address') + "  " + gr.getValue('sys_class_name') + ' '+  gr.getRowCount() );
      }
   if( gr.getRowCount() > 1)  { gs.print("-----------------------------"); count++}
   }


  }
 gs.print(count)


}
