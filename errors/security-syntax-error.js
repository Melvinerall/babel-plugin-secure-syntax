Object.setPrototypeOf = Object.setPrototypeOf || function(object, prototypeOf)
{
    return (object.__proto__ = prototypeOf, object);
};

Object.getPrototypeOf = Object.getPrototypeOf || function(object)
{
    return object.__proto__;
};

function SecuritySyntaxError(message, type, fileName, location)
{
    var instance = new SyntaxError(message);
    instance.fileName = fileName;
    instance.start = location && location.start;
    instance.end = location && location.end;
    instance.lineNumber = instance.start && location.start.lineNumber;
    instance.columnNumber = instance.start && location.start.columnNumber;
    instance.type = type;

    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

    return instance;
}

SecuritySyntaxError.prototype = new SyntaxError();
SecuritySyntaxError.prototype.constructor = SecuritySyntaxError;
SecuritySyntaxError.prototype.toString = function ()
{
    return "SecuritySyntaxError: " + this.message;
};

// Alternate constructor which automatically sets the message based on the type:
SecuritySyntaxError.KeyError = function (type, fileName, location)
{
    return new SecuritySyntaxError("Inline " + type + " was found", type, fileName, location);
};

module.exports = SecuritySyntaxError;
