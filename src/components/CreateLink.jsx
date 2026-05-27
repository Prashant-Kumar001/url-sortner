import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import QRCode from 'react-qrcode-logo';

const CreateLink = ({ longUrl, setLongUrl, customAlias, setCustomAlias, ref, title, setUrlTitle, handleCreate, loading, error }) => {



    return (
      <div>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Create Short Link</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {
                longUrl && <QRCode ref={ref} value={longUrl} size={200} />
            }
            <Input
              type="title"
              value={title}
              onChange={(e) => setUrlTitle(e.target.value)}
              placeholder="Enter title..."
            />
            <Input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your looooong URL..."
            />

            <div className="flex gap-3">
              <Input
                value={customAlias || ""}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="Custom alias (optional) (e.g. trimrr.in/)"
              />

              <Button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
        </Card>
      </div>
    );
}

export default CreateLink
