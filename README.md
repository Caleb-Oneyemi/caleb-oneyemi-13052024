# caleb-oneyemi-13052024

## notes

- configure cron job to fetch records from https://api.reservoir.tools/events/asks/v3?limit=1000 every 5 minutes

- store continuation token and use it for next fetch

- use reduce once to filter by event.kind then map to the DTO, validate and return records to bulk insert
