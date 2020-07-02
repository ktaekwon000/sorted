# Google cloud functions for sorted

# Setup

1. Set up a Google cloud project and install the Cloud SDK with instructions from [link](https://cloud.google.com/functions/docs/first-python#creating_a_gcp_project_using_cloud_sdk)
2. In [torchMojiAPI](torchMojiAPI) run `gcloud functions deploy textToEmoji --runtime python37 --memory 512MB --trigger-http --allow-unauthenticated`
