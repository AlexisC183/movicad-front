# This script assumes a React + Vite project with default settings.

react_dir=. # FIXME

# Directory where to place the production React files.
new_dir=../Movicad/wwwroot/ # FIXME

cd $react_dir
npm run build
rm -R $new_dir
mkdir $new_dir
mv dist/* $new_dir
