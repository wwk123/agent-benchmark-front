"use client";

import { useState } from "react";
import { useSubmissionStore } from "@/stores/submission-store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { AgentConfig, AgentConfigType } from "@/types/models";

export function Step2ConfigureAgent() {
  const { agentConfig, setAgentConfig, setStep } = useSubmissionStore();
  
  const [configType, setConfigType] = useState<AgentConfigType>(
    agentConfig?.type || "docker"
  );

  const [dockerConfig, setDockerConfig] = useState({
    image: agentConfig?.type === "docker" ? agentConfig.image : "",
    tag: agentConfig?.type === "docker" ? agentConfig.tag : "latest",
  });

  const [httpConfig, setHttpConfig] = useState({
    endpoint: agentConfig?.type === "http" ? agentConfig.endpoint : "",
    apiKey: agentConfig?.type === "http" ? agentConfig.apiKey : "",
  });

  const [githubConfig, setGithubConfig] = useState({
    repo: agentConfig?.type === "github" ? agentConfig.repo : "",
    branch: agentConfig?.type === "github" ? agentConfig.branch : "main",
  });

  const isValid = (): boolean => {
    switch (configType) {
      case "docker":
        return !!dockerConfig.image && !!dockerConfig.tag;
      case "http":
        return !!httpConfig.endpoint;
      case "github":
        return !!githubConfig.repo && !!githubConfig.branch;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isValid()) return;

    let config: AgentConfig;

    switch (configType) {
      case "docker":
        config = { type: "docker", image: dockerConfig.image, tag: dockerConfig.tag };
        break;
      case "http":
        config = { type: "http", endpoint: httpConfig.endpoint, apiKey: httpConfig.apiKey || undefined };
        break;
      case "github":
        config = { type: "github", repo: githubConfig.repo, branch: githubConfig.branch };
        break;
    }

    setAgentConfig(config);
    setStep(3);
  };

  return (
    <div className="space-y-10">
      <Tabs defaultValue={configType} onChange={(value) => setConfigType(value as AgentConfigType)}>
        <TabsList>
          <TabsTrigger value="docker">Docker</TabsTrigger>
          <TabsTrigger value="http">HTTP</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
        </TabsList>

        <TabsContent value="docker">
          <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <div>
              <label htmlFor="docker-image" className="block text-sm font-medium mb-2">Docker Image *</label>
              <input
                id="docker-image"
                type="text"
                placeholder="myagent/solver"
                value={dockerConfig.image}
                onChange={(e) => setDockerConfig(prev => ({ ...prev, image: e.target.value }))}
                className="w-full h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>
            <div>
              <label htmlFor="docker-tag" className="block text-sm font-medium mb-2">Tag *</label>
              <input
                id="docker-tag"
                type="text"
                value={dockerConfig.tag}
                onChange={(e) => setDockerConfig(prev => ({ ...prev, tag: e.target.value }))}
                className="w-full h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="http">
          <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <div>
              <label htmlFor="http-endpoint" className="block text-sm font-medium mb-2">API Endpoint *</label>
              <input
                id="http-endpoint"
                type="url"
                placeholder="https://api.example.com/agent"
                value={httpConfig.endpoint}
                onChange={(e) => setHttpConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                className="w-full h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>
            <div>
              <label htmlFor="http-api-key" className="block text-sm font-medium mb-2">API Key</label>
              <input
                id="http-api-key"
                type="password"
                value={httpConfig.apiKey}
                onChange={(e) => setHttpConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                className="w-full h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="github">
          <div className="card p-6 space-y-4 transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
            <div>
              <label htmlFor="github-repo" className="block text-sm font-medium mb-2">Repository *</label>
              <input
                id="github-repo"
                type="text"
                placeholder="owner/repo"
                value={githubConfig.repo}
                onChange={(e) => setGithubConfig(prev => ({ ...prev, repo: e.target.value }))}
                className="w-full h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>
            <div>
              <label htmlFor="github-branch" className="block text-sm font-medium mb-2">Branch *</label>
              <input
                id="github-branch"
                type="text"
                value={githubConfig.branch}
                onChange={(e) => setGithubConfig(prev => ({ ...prev, branch: e.target.value }))}
                className="w-full h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between border-t border-border/80 pt-6">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={handleNext} disabled={!isValid()} size="lg">Next: Select Channel</Button>
      </div>
    </div>
  );
}
