import { describe, it, expect } from "vitest";
import { GET as healthGet } from "@/app/api/health/route";
import { isNotificationEmailConfigured } from "@/lib/notifications/email";
import { POST as dispatchPost } from "@/app/api/notifications/dispatch/route";

describe("Backend API Endpoints & Notification Services", () => {
  it("22. GET /api/health vrne status 200 in veljaven JSON status ok", async () => {
    const response = healthGet();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({
      status: "ok",
      app: "the-five-factions",
    });
  });

  it("23. isNotificationEmailConfigured vrne true, če je definiran SMTP_URL", () => {
    const originalSmtp = process.env.SMTP_URL;
    process.env.SMTP_URL = "smtp://user:pass@smtp.example.com:587";
    expect(isNotificationEmailConfigured()).toBe(true);
    process.env.SMTP_URL = originalSmtp;
  });

  it("24. isNotificationEmailConfigured vrne false v produkciji brez SMTP_URL", () => {
    const originalSmtp = process.env.SMTP_URL;
    const originalNodeEnv = process.env.NODE_ENV;
    delete process.env.SMTP_URL;
    (process.env as Record<string, string>).NODE_ENV = "production";

    expect(isNotificationEmailConfigured()).toBe(false);

    process.env.SMTP_URL = originalSmtp;
    (process.env as Record<string, string>).NODE_ENV = originalNodeEnv;
  });

  it("25. POST /api/notifications/dispatch zavrne zahtevo brez avtorizacije (401)", async () => {
    const req = new Request("http://localhost:3000/api/notifications/dispatch", {
      method: "POST",
    });
    const res = await dispatchPost(req);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Unauthorized");
  });

  it("26. POST /api/notifications/dispatch zavrne zahtevo z napačnim secret žetonom (401)", async () => {
    process.env.NOTIFICATION_CRON_SECRET = "pravi-skrivni-zeton";
    const req = new Request("http://localhost:3000/api/notifications/dispatch", {
      method: "POST",
      headers: {
        authorization: "Bearer napacen-zeton",
      },
    });
    const res = await dispatchPost(req);
    expect(res.status).toBe(401);
  });
});
