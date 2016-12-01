(function () {
  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function isNumeric (number) {
    return !isNaN(number);
  }

  function convertTranslate (values) {
    var valuesArray = values.split(' ');
    var numValues = valuesArray.length;

    if (numValues > 3) {
      throw new InvalidArgument('Too many values for translate');
    }

    for (var i = 0; i < numValues; i++) {
      var elementLength = valuesArray[i].length;
      if (elementLength <= 2) {
        throw new InvalidArgument('Incorrect argument for translate');
      }

      // Check if units are px
      var unit = valuesArray[i].substring(elementLength - 2, elementLength);
      if (unit !== 'px') {
        throw new InvalidArgument('Incorrect units for translate');
      }

      // Check if characters before 'px' are valid numbers
      var number = valuesArray[i].substring(0, elementLength - 2);
      if (!isNumeric(number)) {
        throw new InvalidArgument('Argument must be a number');
      }
    }

    return 'translate(' + valuesArray.join(', ') + ')';
  }

  function toTransform (properties) {
    var result = '';

    if (properties.translate !== undefined && properties.translate !== 'none') {
      result += convertTranslate(properties.translate);
    }
    return result;
  }

  window.InvalidArgument = InvalidArgument;
  window.toTransform = toTransform;
})();
