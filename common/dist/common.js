(function() {
    var undefined;
    var VERSION = "4.17.5";
    var LARGE_ARRAY_SIZE = 200;
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER = 9007199254740991,
        NAN = 0 / 0;
    var argsTag = "[object Arguments]",
        arrayTag = "[object Array]",
        asyncTag = "[object AsyncFunction]",
        boolTag = "[object Boolean]",
        dateTag = "[object Date]",
        errorTag = "[object Error]",
        funcTag = "[object Function]",
        genTag = "[object GeneratorFunction]",
        mapTag = "[object Map]",
        numberTag = "[object Number]",
        nullTag = "[object Null]",
        objectTag = "[object Object]",
        promiseTag = "[object Promise]",
        proxyTag = "[object Proxy]",
        regexpTag = "[object RegExp]",
        setTag = "[object Set]",
        stringTag = "[object String]",
        symbolTag = "[object Symbol]",
        undefinedTag = "[object Undefined]",
        weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]",
        dataViewTag = "[object DataView]",
        float32Tag = "[object Float32Array]",
        float64Tag = "[object Float64Array]",
        int8Tag = "[object Int8Array]",
        int16Tag = "[object Int16Array]",
        int32Tag = "[object Int32Array]",
        uint8Tag = "[object Uint8Array]",
        uint8ClampedTag = "[object Uint8ClampedArray]",
        uint16Tag = "[object Uint16Array]",
        uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
        try {
            return freeProcess && freeProcess.binding && freeProcess.binding("util")
        } catch (e) {}
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    function arrayFilter(array, predicate) {
        var index = -1,
            length = array == null ? 0 : array.length,
            resIndex = 0,
            result = [];
        while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
                result[resIndex++] = value
            }
        }
        return result
    }

    function arrayPush(array, values) {
        var index = -1,
            length = values.length,
            offset = array.length;
        while (++index < length) {
            array[offset + index] = values[index]
        }
        return array
    }

    function arraySome(array, predicate) {
        var index = -1,
            length = array == null ? 0 : array.length;
        while (++index < length) {
            if (predicate(array[index], index, array)) {
                return true
            }
        }
        return false
    }

    function baseTimes(n, iteratee) {
        var index = -1,
            result = Array(n);
        while (++index < n) {
            result[index] = iteratee(index)
        }
        return result
    }

    function baseUnary(func) {
        return function(value) {
            return func(value)
        }
    }

    function cacheHas(cache, key) {
        return cache.has(key)
    }

    function getValue(object, key) {
        return object == null ? undefined : object[key]
    }

    function mapToArray(map) {
        var index = -1,
            result = Array(map.size);
        map.forEach(function(value, key) {
            result[++index] = [key, value]
        });
        return result
    }

    function overArg(func, transform) {
        return function(arg) {
            return func(transform(arg))
        }
    }

    function setToArray(set) {
        var index = -1,
            result = Array(set.size);
        set.forEach(function(value) {
            result[++index] = value
        });
        return result
    }
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : ""
    }();
    var nativeObjectToString = objectProto.toString;
    var oldDash = root._;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer = moduleExports ? root.Buffer : undefined,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;
    var nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min;
    var DataView = getNative(root, "DataView"),
        Map = getNative(root, "Map"),
        Promise = getNative(root, "Promise"),
        Set = getNative(root, "Set"),
        WeakMap = getNative(root, "WeakMap"),
        nativeCreate = getNative(Object, "create");
    var realNames = {};
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    function lodash() {}

    function Hash(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1])
        }
    }

    function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0
    }

    function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result
    }

    function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined : result
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined
    }

    function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key)
    }

    function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
        return this
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    function ListCache(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1])
        }
    }

    function listCacheClear() {
        this.__data__ = [];
        this.size = 0
    }

    function listCacheDelete(key) {
        var data = this.__data__,
            index = assocIndexOf(data, key);
        if (index < 0) {
            return false
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop()
        } else {
            splice.call(data, index, 1)
        }--this.size;
        return true
    }

    function listCacheGet(key) {
        var data = this.__data__,
            index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1]
    }

    function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1
    }

    function listCacheSet(key, value) {
        var data = this.__data__,
            index = assocIndexOf(data, key);
        if (index < 0) {
            ++this.size;
            data.push([key, value])
        } else {
            data[index][1] = value
        }
        return this
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    function MapCache(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1])
        }
    }

    function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
            hash: new Hash,
            map: new(Map || ListCache),
            string: new Hash
        }
    }

    function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result
    }

    function mapCacheGet(key) {
        return getMapData(this, key).get(key)
    }

    function mapCacheHas(key) {
        return getMapData(this, key).has(key)
    }

    function mapCacheSet(key, value) {
        var data = getMapData(this, key),
            size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    function SetCache(values) {
        var index = -1,
            length = values == null ? 0 : values.length;
        this.__data__ = new MapCache;
        while (++index < length) {
            this.add(values[index])
        }
    }

    function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this
    }

    function setCacheHas(value) {
        return this.__data__.has(value)
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size
    }

    function stackClear() {
        this.__data__ = new ListCache;
        this.size = 0
    }

    function stackDelete(key) {
        var data = this.__data__,
            result = data["delete"](key);
        this.size = data.size;
        return result
    }

    function stackGet(key) {
        return this.__data__.get(key)
    }

    function stackHas(key) {
        return this.__data__.has(key)
    }

    function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this
            }
            data = this.__data__ = new MapCache(pairs)
        }
        data.set(key, value);
        this.size = data.size;
        return this
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value),
            isArg = !isArr && isArguments(value),
            isBuff = !isArr && !isArg && isBuffer(value),
            isType = !isArr && !isArg && !isBuff && isTypedArray(value),
            skipIndexes = isArr || isArg || isBuff || isType,
            result = skipIndexes ? baseTimes(value.length, String) : [],
            length = result.length;
        for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
                result.push(key)
            }
        }
        return result
    }

    function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
            if (eq(array[length][0], key)) {
                return length
            }
        }
        return -1
    }

    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
    }

    function baseGetTag(value) {
        if (value == null) {
            return value === undefined ? undefinedTag : nullTag
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value)
    }

    function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag
    }

    function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
            return true
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack)
    }

    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object),
            othIsArr = isArray(other),
            objTag = objIsArr ? arrayTag : getTag(object),
            othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag,
            othIsObj = othTag == objectTag,
            isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
                return false
            }
            objIsArr = true;
            objIsObj = false
        }
        if (isSameTag && !objIsObj) {
            stack || (stack = new Stack);
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack)
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object,
                    othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack);
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
            }
        }
        if (!isSameTag) {
            return false
        }
        stack || (stack = new Stack);
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
    }

    function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
            return false
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value))
    }

    function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
    }

    function baseKeys(object) {
        if (!isPrototype(object)) {
            return nativeKeys(object)
        }
        var result = [];
        for (var key in Object(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
                result.push(key)
            }
        }
        return result
    }

    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
            arrLength = array.length,
            othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false
        }
        var stacked = stack.get(array);
        if (stacked && stack.get(other)) {
            return stacked == other
        }
        var index = -1,
            result = true,
            seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
            var arrValue = array[index],
                othValue = other[index];
            if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack)
            }
            if (compared !== undefined) {
                if (compared) {
                    continue
                }
                result = false;
                break
            }
            if (seen) {
                if (!arraySome(other, function(othValue, othIndex) {
                        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                            return seen.push(othIndex)
                        }
                    })) {
                    result = false;
                    break
                }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result = false;
                break
            }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result
    }

    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
            case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                    return false
                }
                object = object.buffer;
                other = other.buffer;
            case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                    return false
                }
                return true;
            case boolTag:
            case dateTag:
            case numberTag:
                return eq(+object, +other);
            case errorTag:
                return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
                return object == other + "";
            case mapTag:
                var convert = mapToArray;
            case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                    return false
                }
                var stacked = stack.get(object);
                if (stacked) {
                    return stacked == other
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result;
            case symbolTag:
                if (symbolValueOf) {
                    return symbolValueOf.call(object) == symbolValueOf.call(other)
                }
        }
        return false
    }

    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
            objProps = getAllKeys(object),
            objLength = objProps.length,
            othProps = getAllKeys(other),
            othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
            return false
        }
        var index = objLength;
        while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false
            }
        }
        var stacked = stack.get(object);
        if (stacked && stack.get(other)) {
            return stacked == other
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key],
                othValue = other[key];
            if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack)
            }
            if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result = false;
                break
            }
            skipCtor || (skipCtor = key == "constructor")
        }
        if (result && !skipCtor) {
            var objCtor = object.constructor,
                othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result = false
            }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result
    }

    function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols)
    }

    function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map
    }

    function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined
    }

    function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
            tag = value[symToStringTag];
        try {
            value[symToStringTag] = undefined;
            var unmasked = true
        } catch (e) {}
        var result = nativeObjectToString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag
            } else {
                delete value[symToStringTag]
            }
        }
        return result
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
            return []
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol)
        })
    };
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) {
        getTag = function(value) {
            var result = baseGetTag(value),
                Ctor = result == objectTag ? value.constructor : undefined,
                ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
                switch (ctorString) {
                    case dataViewCtorString:
                        return dataViewTag;
                    case mapCtorString:
                        return mapTag;
                    case promiseCtorString:
                        return promiseTag;
                    case setCtorString:
                        return setTag;
                    case weakMapCtorString:
                        return weakMapTag
                }
            }
            return result
        }
    }

    function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length)
    }

    function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null
    }

    function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func
    }

    function isPrototype(value) {
        var Ctor = value && value.constructor,
            proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto
    }

    function objectToString(value) {
        return nativeObjectToString.call(value)
    }

    function toSource(func) {
        if (func != null) {
            try {
                return funcToString.call(func)
            } catch (e) {}
            try {
                return func + ""
            } catch (e) {}
        }
        return ""
    }
    var now = function() {
        return root.Date.now()
    };

    function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;
        if (typeof func != "function") {
            throw new TypeError(FUNC_ERROR_TEXT)
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing
        }

        function invokeFunc(time) {
            var args = lastArgs,
                thisArg = lastThis;
            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result
        }

        function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout(timerExpired, wait);
            return leading ? invokeFunc(time) : result
        }

        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
        }

        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait
        }

        function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
                return trailingEdge(time)
            }
            timerId = setTimeout(timerExpired, remainingWait(time))
        }

        function trailingEdge(time) {
            timerId = undefined;
            if (trailing && lastArgs) {
                return invokeFunc(time)
            }
            lastArgs = lastThis = undefined;
            return result
        }

        function cancel() {
            if (timerId !== undefined) {
                clearTimeout(timerId)
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined
        }

        function flush() {
            return timerId === undefined ? result : trailingEdge(now())
        }

        function debounced() {
            var time = now(),
                isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
                if (timerId === undefined) {
                    return leadingEdge(lastCallTime)
                }
                if (maxing) {
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime)
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait)
            }
            return result
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced
    }

    function throttle(func, wait, options) {
        var leading = true,
            trailing = true;
        if (typeof func != "function") {
            throw new TypeError(FUNC_ERROR_TEXT)
        }
        if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing
        }
        return debounce(func, wait, {
            leading: leading,
            maxWait: wait,
            trailing: trailing
        })
    }

    function eq(value, other) {
        return value === other || value !== value && other !== other
    }
    var isArguments = baseIsArguments(function() {
        return arguments
    }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee")
    };
    var isArray = Array.isArray;

    function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value)
    }
    var isBuffer = nativeIsBuffer || stubFalse;

    function isEqual(value, other) {
        return baseIsEqual(value, other)
    }

    function isFunction(value) {
        if (!isObject(value)) {
            return false
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
    }

    function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
    }

    function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function")
    }

    function isObjectLike(value) {
        return value != null && typeof value == "object"
    }

    function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    function toNumber(value) {
        if (typeof value == "number") {
            return value
        }
        if (isSymbol(value)) {
            return NAN
        }
        if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other
        }
        if (typeof value != "string") {
            return value === 0 ? value : +value
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value
    }

    function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
    }

    function noConflict() {
        if (root._ === this) {
            root._ = oldDash
        }
        return this
    }

    function stubArray() {
        return []
    }

    function stubFalse() {
        return false
    }
    lodash.debounce = debounce;
    lodash.keys = keys;
    lodash.throttle = throttle;
    lodash.eq = eq;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayLike = isArrayLike;
    lodash.isBuffer = isBuffer;
    lodash.isEqual = isEqual;
    lodash.isFunction = isFunction;
    lodash.isLength = isLength;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.noConflict = noConflict;
    lodash.now = now;
    lodash.toNumber = toNumber;
    lodash.VERSION = VERSION;
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = lodash;
        define(function() {
            return lodash
        })
    } else if (freeModule) {
        (freeModule.exports = lodash)._ = lodash;
        freeExports._ = lodash
    } else {
        root._ = lodash
    }
}).call(this);
(function(window, document, $, undefined) {
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, "find", {
            value: function(predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined')
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function")
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue
                    }
                    k++
                }
                return undefined
            },
            configurable: true,
            writable: true
        })
    }
    var EventManager = window.EventManager = function() {
        var slice = Array.prototype.slice;
        var MethodsAvailable = {
            removeFilter: removeFilter,
            applyFilters: applyFilters,
            addFilter: addFilter,
            removeAction: removeAction,
            doAction: doAction,
            addAction: addAction
        };
        var STORAGE = {
            actions: {},
            filters: {}
        };

        function addAction(action, callback, priority, context) {
            if (typeof action === "string" && typeof callback === "function") {
                priority = parseInt(priority || 10, 10);
                _addHook("actions", action, callback, priority, context)
            }
            return MethodsAvailable
        }

        function doAction() {
            var args = slice.call(arguments);
            var action = args.shift();
            if (typeof action === "string") {
                _runHook("actions", action, args)
            }
            return MethodsAvailable
        }

        function removeAction(action, callback, context) {
            if (typeof action === "string") {
                _removeHook("actions", action, callback, context)
            }
            return MethodsAvailable
        }

        function addFilter(filter, callback, priority, context) {
            if (typeof filter === "string" && typeof callback === "function") {
                priority = parseInt(priority || 10, 10);
                _addHook("filters", filter, callback, priority, context)
            }
            return MethodsAvailable
        }

        function applyFilters() {
            var args = slice.call(arguments);
            var filter = args.shift();
            if (typeof filter === "string") {
                return _runHook("filters", filter, args)
            }
            return MethodsAvailable
        }

        function removeFilter(filter, callback, context) {
            if (typeof filter === "string") {
                _removeHook("filters", filter, callback, context)
            }
            return MethodsAvailable
        }

        function _removeHook(type, hook, callback, context) {
            var handlers, handler, i;
            if (!STORAGE[type][hook]) {
                return
            }
            if (!callback) {
                STORAGE[type][hook] = []
            } else {
                handlers = STORAGE[type][hook];
                if (!context) {
                    for (i = handlers.length; i--;) {
                        if (handlers[i].callback === callback) {
                            handlers.splice(i, 1)
                        }
                    }
                } else {
                    for (i = handlers.length; i--;) {
                        handler = handlers[i];
                        if (handler.callback === callback && handler.context === context) {
                            handlers.splice(i, 1)
                        }
                    }
                }
            }
        }

        function _addHook(type, hook, callback, priority, context) {
            var hookObject = {
                callback: callback,
                priority: priority,
                context: context
            };
            var hooks = STORAGE[type][hook];
            if (hooks) {
                hooks.push(hookObject);
                hooks = _hookInsertSort(hooks)
            } else {
                hooks = [hookObject]
            }
            STORAGE[type][hook] = hooks
        }

        function _hookInsertSort(hooks) {
            var tmpHook, j, prevHook;
            for (var i = 1, len = hooks.length; i < len; i++) {
                tmpHook = hooks[i];
                j = i;
                while ((prevHook = hooks[j - 1]) && prevHook.priority > tmpHook.priority) {
                    hooks[j] = hooks[j - 1];
                    --j
                }
                hooks[j] = tmpHook
            }
            return hooks
        }

        function _runHook(type, hook, args) {
            var handlers = STORAGE[type][hook],
                i, len;
            if (!handlers) {
                return type === "filters" ? args[0] : false
            }
            len = handlers.length;
            if (type === "filters") {
                for (i = 0; i < len; i++) {
                    args[0] = handlers[i].callback.apply(handlers[i].context, args)
                }
            } else {
                for (i = 0; i < len; i++) {
                    handlers[i].callback.apply(handlers[i].context, args)
                }
            }
            return type === "filters" ? args[0] : true
        }
        return MethodsAvailable
    };
    var hooks = new EventManager;
    var actionHistory = {};
    var globals = {};
    var INIT = globals.INIT = "init";
    var REGISTER = globals.REGISTER = "initRegister";
    var READY = globals.READY = "initReady";
    var HASH_STATE_CHANGE = globals.HASH_STATE_CHANGE = "hashStateChange";
    var SET_HASH_STATE = globals.SET_HASH_STATE = "setHashState";
    var LAYOUT = globals.LAYOUT = "layout";
    var LAYOUTEND = globals.LAYOUTEND = "layoutEnd";
    var SCROLLSTART = globals.SCROLLSTART = "scrollStart";
    var SCROLL = globals.SCROLL = "scroll";
    var SCROLLEND = globals.SCROLLEND = "scrollEnd";
    var USER_FIRST_INTERACTION = globals.USER_FIRST_INTERACTION = "userFirstInteraction";
    var GFORM_CONFIRM = globals.GFORM_CONFIRM = "gformConfirmation";
    var GA_EVENT = globals.GA_EVENT = "gaEvent";
    var GTM_INTERACTION = globals.GTM_INTERACTION = "dataLayerInteraction";
    var GTM_STATE = globals.GTM_STATE = "dataLayerState";
    var TRANSITION_END_EVENT = globals.TRANSITION_END_EVENT = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
    var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var _ = window.lodash = window._.noConflict();
    var Estarossa = window.Estarossa = function(hook, callback) {
        if ($.isFunction(hook)) {
            callback = hook;
            hook = false
        }
        hook = hook || REGISTER;
        hooks.addAction(hook, function(args) {
            return callback($, _, window, document, args)
        })
    };
    $.extend(Estarossa, globals, {
        addAction: function(action, callback, priority, context) {
            hooks.addAction.apply(this, arguments);
            return this
        },
        removeAction: function(action, callback, context) {
            hooks.removeAction.apply(this, arguments);
            return this
        },
        doAction: function(action) {
            actionHistory[action] = 1;
            hooks.doAction.apply(this, arguments);
            actionHistory[action] = 0;
            return this
        },
        doingAction: function(action) {
            return actionHistory[action] === 1
        },
        didAction: function(action) {
            return actionHistory[action] !== undefined
        },
        currentAction: function() {
            for (var k in actionHistory) {
                if (actionHistory[k]) {
                    return k
                }
            }
            return false
        },
        addFilter: function(filter, callback, priority, context) {
            hooks.addFilter.apply(this, arguments);
            return this
        },
        removeFilter: function(filter, callback, context) {
            hooks.removeFilter.apply(this, arguments);
            return this
        },
        applyFilters: function(action) {
            return hooks.applyFilters.apply(this, arguments)
        }
    });
    Estarossa.updateUrlParameter = function(uri, key, value) {
        if (!value && key.indexOf("=") !== -1) {
            key = key.split("=");
            value = key.pop();
            key = key.shift()
        }
        var i = uri.indexOf("#");
        var hash = i === -1 ? "" : uri.substr(i);
        uri = i === -1 ? uri : uri.substr(0, i);
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf("?") !== -1 ? "&" : "?";
        if (!value) {
            uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), "");
            if (uri.slice(-1) === "?") {
                uri = uri.slice(0, -1)
            }
            if (uri.indexOf("?") === -1) {
                uri = uri.replace(/&/, "?")
            }
        } else if (uri.match(re)) {
            uri = uri.replace(re, "$1" + key + "=" + value + "$2")
        } else {
            uri = uri + separator + key + "=" + value
        }
        return uri + hash
    };
    Estarossa.splitStr = function(str, delim) {
        delim = delim || ",";
        if ($.isArray(str)) {
            return str
        }
        return str.split(delim).map(function(item) {
            return item.trim()
        }) || []
    };
    Estarossa.groupByParent = function(selector) {
        return $(selector).parent().map(function() {
            return $(this).children(selector)
        })
    };
    Estarossa.uniqueID = function() {
        return Math.random().toString(36).substr(3, 6) + "-" + Math.random().toString(36).substr(3, 6)
    };
    Estarossa.storageAvailable = function(type) {
        var storage = [];
        try {
            storage = window[type];
            var x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true
        } catch (e) {
            return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") && storage.length !== 0
        }
    };
    Estarossa.whitelistAssign = function(defaults, override) {
        $.each(override, function(key, value) {
            if (defaults.hasOwnProperty(key)) {
                defaults[key] = value
            }
        })
    };
    Estarossa.groupByRow = function($els) {
        var groups = {};
        var row = 0;
        $els.each(function() {
            var $this = $(this);
            if (!$this.is(":visible")) {
                return true
            }
            var top = $this.offset().top;
            var bottom = top + $this.height();
            var found = false;
            $.each(groups, function(index, obj) {
                if (top <= obj.top && bottom >= obj.bottom) {
                    obj.top = top;
                    obj.bottom = bottom;
                    obj.$els = obj.$els.add($this);
                    found = true
                } else if (top >= obj.top && bottom <= obj.bottom) {
                    obj.$els = obj.$els.add($this);
                    found = true
                }
            });
            if (!found) {
                groups[row] = {
                    top: top,
                    bottom: bottom,
                    $els: $this
                };
                row++
            }
        });
        groups = Object.keys(groups).map(function(k) {
            return groups[k]
        });
        groups.sort(function(a, b) {
            return a.top > b.top ? 1 : -1
        });
        return groups.map(function(group) {
            return group.$els
        })
    };
    Estarossa.imageBrightness = function(imageSrc, callback) {
        var img = new Image;
        img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            var r, g, b, lum;
            var colorSum = 0;
            for (var x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];
                lum = .299 * r + .587 * g + .114 * b;
                colorSum += lum
            }
            var brightness = Math.round(colorSum / (this.width * this.height) / 255 * 100);
            callback(brightness)
        };
        if (/^([\w]+\:)?\/\//.test(imageSrc) && imageSrc.indexOf(location.host) === -1) {
            img.crossOrigin = "anonymous";
            imageSrc = "https://cors-anywhere.herokuapp.com/" + imageSrc
        }
        img.src = imageSrc
    };
    var viewport = Estarossa.viewport = function() {
        var width = function() {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        };
        var height = function() {
            return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
        var scrollPosition = function() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = height();
            var scrollBottom = scrollTop + windowHeight;
            return {
                top: scrollTop,
                bottom: scrollBottom,
                height: windowHeight
            }
        };
        var isInViewport = function(el) {
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0]
            }
            if (!el) {
                return false
            }
            var rect = el.getBoundingClientRect();
            return rect.bottom >= 0 && rect.right >= 0 && rect.top <= height() && rect.left <= width()
        };
        return {
            width: width,
            height: height,
            scrollPosition: scrollPosition,
            isInViewport: isInViewport
        }
    }();
    (function(window, doAction, addAction) {
        var HashState = function(previous) {
            this.current = $.address.path();
            this.currentList = $.address.pathNames();
            this.currentId = this.current.replace("/", "__");
            if (previous !== undefined) {
                this.previous = previous.current;
                this.previousList = previous.currentList
            }
        };
        HashState.prototype.hasChanged = function() {
            return this.current !== this.previous
        };
        HashState.prototype.isset = function() {
            return !!this.current
        };
        HashState.prototype.matchesHash = function(hash) {
            return this.current.indexOf(hash.replace(/^#/, "")) > -1
        };
        $.address.strict(false);
        $.address.tracker(function() {});
        var currentState = new HashState;
        var state = {
            emit: function() {
                if (currentState.isset() && currentState.hasChanged()) {
                    doAction(Estarossa.HASH_STATE_CHANGE, currentState)
                }
            },
            isset: function() {
                return currentState.isset()
            },
            get: function() {
                return currentState
            },
            set: function(newState) {
                if (typeof newState === "string") {
                    $.address.path(newState);
                    return
                }
                currentState = new HashState(currentState);
                state.emit()
            },
            setList: function(stateList) {
                state.set(stateList.join("/"))
            }
        };
        addAction(READY, function() {
            state.emit();
            $.address.change(function() {
                state.set()
            })
        }, 99);
        addAction(SET_HASH_STATE, function(hash) {
            state.set(hash)
        });
        Estarossa.hashState = state
    })(window, Estarossa.doAction, Estarossa.addAction);
    (function(doAction, addAction, applyFilters) {
        addAction(REGISTER, function() {
            var debounce = applyFilters("debounceDelay", 300) || 300;
            var throttleLayout = applyFilters("layoutThrottle", 250) || 250;
            var throttleScroll = applyFilters("scrollThrottle", 100) || 100;
            var docWidth = viewport.width();
            var isScrolling = false;
            var currentWidth = 0;
            var widthHasChanged = function() {
                var newWidth = viewport.width();
                if (currentWidth === newWidth) {
                    return false
                }
                currentWidth = newWidth;
                return true
            };
            var broadcastLayoutUpdate = _.throttle(function() {
                doAction(LAYOUT, widthHasChanged())
            }, throttleLayout, {
                leading: false
            });
            var broadcastLayoutEnd = _.debounce(function() {
                doAction(LAYOUTEND)
            }, debounce);
            var broadcastScrollEnd = _.debounce(function(event, position) {
                isScrolling = false;
                doAction(SCROLLEND, event, position)
            }, debounce);
            var layoutUpdate = Estarossa.updateLayout = function() {
                broadcastLayoutUpdate();
                broadcastLayoutEnd()
            };
            var onScroll = _.throttle(function(event) {
                var position = viewport.scrollPosition();
                if (!isScrolling) {
                    isScrolling = true;
                    doAction(SCROLLSTART, event, position)
                }
                doAction(SCROLL, event, position);
                broadcastScrollEnd(event, position)
            }, throttleScroll, {
                leading: true
            });
            var onUserFirstInteraction = function() {
                $(window).off("keydown mousemove touchmove touchstart touchend wheel", onUserFirstInteraction);
                doAction(USER_FIRST_INTERACTION)
            };
            $(window).on("load orientationchange", layoutUpdate);
            $(window).on("orientationchange", function() {
                setTimeout(layoutUpdate, 600)
            });
            if (isiOS) {
                $(window).on("resize", function() {
                    var width = viewport.width();
                    if (width !== docWidth) {
                        layoutUpdate()
                    }
                    docWidth = width
                })
            } else {
                $(window).on("resize", layoutUpdate)
            }
            $(document).on("keydown", function(e) {
                var code = e.which || e.keyCode;
                var codes = {
                    9: "tab",
                    13: "return",
                    27: "esc"
                };
                if (codes.hasOwnProperty(code)) {
                    doAction("key." + codes[code], e)
                }
            });
            $(window).on("scroll", onScroll);
            $(window).one("keydown mousemove touchmove touchstart touchend wheel", onUserFirstInteraction);
            layoutUpdate()
        }, 100);
        $(function() {
            $(document).trigger("Estarossa.init", Estarossa);
            doAction(INIT);
            doAction(REGISTER);
            doAction(READY)
        });
        $(document).bind("gform_confirmation_loaded", function(event, formId) {
            doAction(GFORM_CONFIRM, formId)
        })
    })(Estarossa.doAction, Estarossa.addAction, Estarossa.applyFilters);
    (function() {
        var scripts = {};
        var cachedScript = function(url, options) {
            options = $.extend(options || {}, {
                dataType: "script",
                cache: true,
                url: url
            });
            return jQuery.ajax(options)
        };
        var registerScript = Estarossa.registerScript = function(scriptName, url) {
            scripts[scriptName] = {
                url: url,
                deferred: $.Deferred(),
                requested: false
            }
        };
        Estarossa.loadScript = function(name, url) {
            if (!scripts.hasOwnProperty(name)) {
                if (url) {
                    registerScript(name, url)
                } else {
                    return false
                }
            }
            if (!scripts[name].requested) {
                scripts[name].requested = true;
                cachedScript(scripts[name].url).done(function() {
                    scripts[name].deferred.resolve(name)
                })
            }
            return scripts[name].deferred.promise()
        }
    })();
    (function(addAction, removeAction) {
        var registered = [];
        var windowLoaded = false;
        Estarossa.scrollWatch = function($els, callback, options) {
            options = $.extend({
                force: false,
                defer: false,
                prune: true
            }, options || {});
            if ($els.length) {
                registered.push({
                    $els: $els,
                    callback: callback,
                    options: options
                })
            }
        };

        function initCallback(group) {
            if (group.options.defer && !windowLoaded) {
                return
            }
            group.$els.each(function() {
                var $this = $(this);
                if (Estarossa.viewport.isInViewport($this) && (group.force || $this.is(":visible"))) {
                    var prune = group.callback.call(this, $this);
                    if (prune || group.options.prune) {
                        group.$els = group.$els.not($this)
                    }
                }
            })
        }

        function checkElements() {
            for (var i = 0; i < registered.length; i++) {
                if (registered[i].$els.length) {
                    initCallback(registered[i])
                } else {
                    registered.splice(i, 1)
                }
            }
        }
        addAction(READY, checkElements);
        addAction(SCROLL, checkElements);
        addAction(LAYOUT, checkElements);
        $(window).on("load", function() {
            windowLoaded = true
        })
    })(Estarossa.addAction, Estarossa.removeAction);
    (function(addAction, addFilter, applyFilters) {
        var $header = $("header").first();
        var headerHeight = $header.outerHeight();
        addFilter("header-height", function() {
            return $header.outerHeight(true) || 0
        }, 5);
        addFilter("header-offset", function() {
            if (!window.pageYOffset) {
                headerHeight = $header.outerHeight()
            }
            return headerHeight || 0
        }, 5);
        addFilter("css-vars/register", function(styles) {
            styles["header-height"] = function() {
                return applyFilters("header-height") + "px"
            };
            styles["header-offset"] = function() {
                return applyFilters("header-offset") + "px"
            };
            return styles
        });
        var scrollTargetFallback = _.debounce(function adjustScroll(e) {
            var $browserTarget = $(":target");
            if (!($browserTarget.length && (parseInt($browserTarget.css("padding-top"), 10) || $browserTarget.hasClass("anchor")))) {
                return
            }
            var selector;
            try {
                selector = e.currentTarget.getAttribute("href")
            } catch (error) {
                selector = e.hasOwnProperty("current") ? "#" + e.current : ""
            }
            if (selector.charAt(0) !== "#") {
                return
            }
            var $actionTarget = $(selector);
            if (!$actionTarget.length || !$actionTarget.is($browserTarget)) {
                return
            }
            $(window).scrollTop($actionTarget.offset().top - applyFilters("header-height"))
        }, 0);
        addAction(Estarossa.HASH_STATE_CHANGE, scrollTargetFallback);
        $(document).on("click", "a", scrollTargetFallback)
    })(Estarossa.addAction, Estarossa.addFilter, Estarossa.applyFilters);

    function DynamicStylesheet(name, compat) {
        var self = this;
        self.name = name;
        self.compat = compat;
        self.styles = {};
        self.$tag = $("<style />", {
            id: self.name,
            type: "text/css"
        });
        if (self.compat) {
            $("head").append(self.$tag)
        }
        self.sheet = self.$tag[0].sheet
    }
    DynamicStylesheet.prototype = {
        update: function() {
            var self = this;
            if ($.isEmptyObject(self.styles)) {
                return
            }
            var ruleVals = {};
            var rules = $.map(self.styles, function(method, key) {
                var value = typeof method === "function" ? method() : method;
                var property = "--dynamic__" + key;
                ruleVals[property] = value;
                return [property, value].join(":")
            }).join(";");
            if (!self.compat) {
                window.cssVars({
                    variables: ruleVals
                })
            } else {
                self.sheet.insertRule(":root {" + rules + "}", 0);
                while (self.sheet.cssRules.length > 1) {
                    self.sheet.deleteRule(self.sheet.cssRules.length - 1)
                }
            }
        }
    };
    Estarossa.DynamicStylesheet = DynamicStylesheet;
    (function(addAction, applyFilters) {
        var compat = !window.hasOwnProperty("cssVars");
        var layoutStyles = new DynamicStylesheet("dynamic-styles", compat);
        var scrollStyles = new DynamicStylesheet("scroll-styles", compat);
        var scrollPosition = Estarossa.viewport.scrollPosition().top;
        addAction(READY, function() {
            var useScroll = applyFilters("css-vars/use-scroll", false);
            layoutStyles.styles = applyFilters("css-vars/register", layoutStyles.styles);
            layoutStyles.update();
            if (useScroll) {
                scrollStyles.styles = applyFilters("css-vars/register-scroll", scrollStyles.styles);
                scrollStyles.update();
                addAction(SCROLL, scrollStyles.update, 10, scrollStyles)
            }
        }, 100);
        addAction(LAYOUT, layoutStyles.update, 10, layoutStyles);
        addAction("css-vars/refresh", layoutStyles.update, 10, layoutStyles);
        Estarossa.addFilter("css-vars/register-scroll", function(styles) {
            styles["scroll-direction"] = function() {
                var newPosition = Estarossa.viewport.scrollPosition().top;
                var direction = newPosition >= scrollPosition ? 1 : -1;
                scrollPosition = newPosition;
                return direction
            };
            return styles
        })
    })(Estarossa.addAction, Estarossa.applyFilters);
    var scriptsLoaded = false;
    var loadGFormScripts = function(formId) {
        var promises = [];
        if (!scriptsLoaded) {
            $("script[data-gform-src]").each(function() {
                this.setAttribute("src", this.dataset.gformSrc);
                promises.push($.Deferred(function(defer) {
                    this.onload = defer.resolve;
                    this.onerror = defer.reject
                }.bind(this)))
            });
            scriptsLoaded = true
        }
        $.when.apply($, promises).then(function() {
            if (window.gFormLoadStack && window.gFormLoadStack[formId] && window.executeLoadStack) {
                window.executeLoadStack(window.gFormLoadStack[formId])
            }
        })
    };
    (function(addAction) {
        function initLoad() {
            $(".gform_wrapper").each(function() {
                loadGFormScripts(this.id)
            });
            setTimeout(function() {
                Estarossa.removeAction(USER_FIRST_INTERACTION, initLoad);
                Estarossa.removeAction("showModal", initLoad)
            }, 0)
        }
        addAction(USER_FIRST_INTERACTION, initLoad);
        addAction("showModal", initLoad)
    })(Estarossa.addAction)
})(window, document, jQuery);