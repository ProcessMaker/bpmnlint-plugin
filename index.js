module.exports = {
  configs: {
    all: {
      rules: {
        'processmaker/custom-validation': 'error',
        'processmaker/gateway-direction': 'error',
        'processmaker/call-activity-child-process': 'error',
        'processmaker/call-activity-sequence-flow': 'error',
        'processmaker/id-required': 'error',
        'processmaker/signal-ref-required': 'error',
      },
    },
  },
};
