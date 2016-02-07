(function() {
    app.factory('modlistService', ['$q', '$rootScope', 'nwService', modlistService]);

    //TODO: refactor with actual listarray
        
     /**
     * CRUD for Modlists (sidebar)
     * 
     * @method modlistService
     * @module ssgl
     * @submodule modlistService    
     */
    function modlistService($q, $rootScope, nwService) {
        var service = {};
        /**
         * Directory where the Lists are
         * 
         * @property listDir
         * @private
         * @type {String}
         */
        var listDir = nwService.buildPath(['lists']);
        
        /**
         * Reame a List async
         * 
         * @method rename
         * @async
         * @for modlistService
         * @param  {Object} item
         * @return {Promise} 
         */
        service.rename = function(item) {
            var oldPath = item.path;
            var newPath = nwService.buildPath([listDir, item.name + '.json'], true);

            item.path = newPath;

            return nwService.rename(oldPath, newPath);
        };

        /**
         * Removes Item async
         * 
         * @method remove
         * @async
         * @for modlistService
         * @param  {Object} item
         * @return {Promise}
         */
        service.remove = function(item) {
            return nwService.remove(item.path);
        };

        /**
         * Saves selected lists into JSON File async
         * 
         * @method saveSelected
         * @for modlistService
         * @param  {Object} listObj {name: '', list: ''}
         * @async
         * @return {Promise}  
         */
        service.saveSelected = function(listObj) {
            return nwService.writeJSON(listObj.list, nwService.buildPath(['lists', listObj.name + '.json'], true));
        };

        /**
         * Fetching Lists from Directory async
         * 
         * @method getLists
         * @for modlistService
         * @async
         * @return {Promise}
         */
        service.getLists = function() {
            var def = $q.defer();

            nwService.getDir(listDir, true).then(function(items) {
                
                var lists = items.map(function(item) {

                    return {
                        name: nwService.getName(item),
                        path: nwService.getAbsolute(nwService.buildPath(['lists', item])),
                        wads: nwService.readSyncJSON(nwService.buildPath(['lists', item], true))
                    };
                });

                def.resolve(lists);

            });

            return def.promise;

        };

        return service;
    }

})();