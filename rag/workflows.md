# Workflows

## Development
- **Start Local Server**: `npm run dev` (Starts Vite dev server)
- **Local Preview**: `npm run preview`

## Building
- **Command**: `npm run build`
- **Output**: Generates static assets in `dist/` directory.

## Deployment
- **Method**: Automated CI/CD Pipeline via Jenkins.
- **Trigger**: Git push.
- **Process**:
  1. **Pull Source**: Updates repository.
  2. **Login to GHCR**: Authenticates with GitHub Container Registry.
  3. **Build & Push**: 
     - Builds Docker image if not exists remotely.
     - Tags with commit hash and `latest`.
     - Pushes to `ghcr.io/rheinmir/png2xnb`.
  4. **Deploy**:
     - Pulls image.
     - Stops/Removes old container (`png2xnb-server`).
     - Runs new container on Host Port `5821` mapped to Container Port `80`.
  5. **Cleanup**: Prunes old images to save space.

## Testing
- **Manual Testing**: Verify functionality via the web interface.
- **Critical Paths**: File drag & drop, XNB conversion, ZIP download.
