!function(window) {
    var config = {
        platformId: 905,
        urls: [ "https://a.config.skype.com/config/v1", "https://b.config.skype.com/config/v1" ],
        team: "SkypeLyncWebExperience",
        maximumAttempts: 3,
        waitDuration: 3e3
    };
    window.Skype = window.Skype || {};
    var version = "1.1.23.0";
    !function(root) {
        function createErrorMessage(error, code) {
            var errorObj = error;
            return code = void 0 === code ? 1 : code, "object" != typeof errorObj && (errorObj = {
                message: error || "unknown error"
            }), void 0 === errorObj.code && (errorObj.code = code), errorObj;
        }
        function createWarningMessage(message) {
            return createErrorMessage(message, 0);
        }
        function validateSettings(settings) {
            if (void 0 === settings || null === settings) throw "settings object is required";
        }
        function validateSuccessCallback(onSuccess) {
            if ("function" != typeof onSuccess) throw "onSuccess callback is required";
        }
        root.getVersion = function() {
            return version;
        }, root.initialize = function(settings, onSuccess, onError) {
            "use strict";
            function handleError(error) {
                onError && onError(createErrorMessage(error));
            }
            function onConfig(config) {
                if (!config.packageUrl) return void handleError(createWarningMessage("no package to load for this config"));
                var configLoaded = new Date().getTime(), scriptAttributes = {};
                root.onExperienceLoaded = function(experience) {
                    var packageLoaded = new Date().getTime();
                    experience.init({
                        initParams: settings,
                        config: config,
                        configLoadDuration: configLoaded - start,
                        packageLoadDuration: packageLoaded - configLoaded
                    }, onSuccess, handleError), delete root.onExperienceLoaded;
                }, config.corsScript && (scriptAttributes.crossOrigin = ""), loader.loadScript(config.packageUrl, null, handleError, scriptAttributes);
            }
            var start = new Date().getTime();
            validateSettings(settings), validateSuccessCallback(onSuccess), settings.fingerprint = fingerprint.get(window), 
            configurationLoader.loadConfig(settings, onConfig, handleError);
        };
    }(window.Skype);
    var configurationLoader = function() {
        "use strict";
        function buildUrls(parameters) {
            var urls = [];
            return config && config.urls && (urls = buildVersionedUrls(config.urls, parameters)), 
            urls;
        }
        function buildVersionedUrls(urls, parameters) {
            var i, path, ecvOverrideValue = ecsOverride.get(window), formattedUrl = [];
            for (i = 0; i < urls.length; i++) path = urls[i] + "/" + config.team + "/" + config.platformId + "_" + version, 
            path += "?apikey=" + parameters.apiKey, parameters.fingerprint && (path += "&fingerprint=" + parameters.fingerprint), 
            ecvOverrideValue && (path += "&ecsoverride=" + ecvOverrideValue), formattedUrl.push(path);
            return formattedUrl;
        }
        function loadConfig(parameters, success, failure) {
            function callConfigServer(url) {
                requestCount++, jsonp.request(url, "onConfigurationLoaded", onSuccess, onFailure, "ecsConfig");
            }
            function hasRunMaximumAttempts() {
                return requestCount / urls.length >= (config.maximumAttempts || maxAttempts);
            }
            function onSuccess(data) {
                if (!hasSucceeded && (hasSucceeded = !0, success && data)) {
                    var ecsConfig = data[config.team];
                    ecsConfig && success(ecsConfig);
                }
            }
            function onFailure() {
                hasRunMaximumAttempts() ? failure && failure("configuration service unreachable") : callConfigServer(urls[++urlIndex % urls.length]);
            }
            var hasSucceeded, urls, requestCount = 0, urlIndex = 0;
            return parameters && parameters.apiKey ? (urls = buildUrls(parameters), urls && urls.length ? void callConfigServer(urls[urlIndex]) : void (failure && failure("no configuration service endpoint"))) : void (failure && failure("apiKey is required"));
        }
        var maxAttempts = 2;
        return {
            loadConfig: loadConfig
        };
    }(), ecsOverride = function() {
        "use strict";
        function get(win) {
            win = win || window;
            var matches = win.location.search.match(new RegExp(urlPattern, "i"));
            return matches && matches[1] ? matches[1] : (matches = win.document.cookie.match(new RegExp(cookiePattern, "i")), 
            matches && matches[1] ? matches[1] : void 0);
        }
        var parameterName = "ecsoverride", urlPattern = "\\b" + parameterName + "=([^&]+)", cookiePattern = "\\b" + parameterName + "=([^;]+)";
        return {
            get: get
        };
    }(), fingerprint = function() {
        "use strict";
        function generateGuid() {
            return ("0000000" + Date.now().toString(16)).slice(-8) + "-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.floor(16 * Math.random());
                return ("x" === c ? r : 8 + r % 4).toString(16);
            });
        }
        function get(win) {
            win = win || window;
            var guid = win.localStorage.getItem(KEY);
            if (!guid) {
                guid = generateGuid();
                try {
                    win.localStorage.setItem(KEY, guid);
                } catch (ignore) {}
            }
            return guid;
        }
        var KEY = "skype.fingerprint";
        return {
            get: get
        };
    }(), jsonp = function(win) {
        "use strict";
        function request(url, callbackName, success, error, id) {
            if (!url || !callbackName) throw "mandatory options missing";
            var jsonpUrl, timeout, errorCallback = function() {
                win.clearInterval(timeout), error && (error(), error = null, success = null);
            };
            jsonpUrl = url + (/\?/.test(url) ? "&" : "?") + "callback=Skype." + callbackName, 
            win.Skype[callbackName] = function() {
                win.clearInterval(timeout), success && success.apply(null, arguments);
            }, loader.loadScript(jsonpUrl, noop, errorCallback, {
                id: id
            }), timeout = win.setTimeout(errorCallback, config.timeout || 2e4);
        }
        var noop = function() {};
        return {
            request: request
        };
    }(window), loader = function() {
        "use strict";
        function loadScript(url, onLoaded, onFailed, attributes) {
            var script = document.createElement("script");
            attributes = attributes || {}, script.src = url, script.type = "text/javascript", 
            script.defer = !0, onLoaded && (script.onload = onLoaded), onFailed && (script.onerror = onFailed), 
            Object.keys(attributes).forEach(function(key) {
                void 0 !== attributes[key] && (script[key] = attributes[key]);
            }), document.head.appendChild(script);
        }
        return {
            loadScript: loadScript
        };
    }();
}(global);