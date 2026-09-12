const affiliateLinks = {
  cashApp: 'https://cash.app/refer/91M4MR9',
  ally: 'https://ally.com/referral?code=2J5X2J2J7B&CP=WebAppReferFriend'
};

document.querySelectorAll('.affiliate-link').forEach((link) => {
  const key = link.dataset.linkKey;
  const destination = affiliateLinks[key];

  if (destination) {
    link.href = destination;
    link.target = '_blank';
    link.rel = 'sponsored noopener';
    return;
  }

  link.setAttribute('aria-disabled', 'true');
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.alert('Referral link pending: add the approved tracking URL in app.js before publishing.');
  });
});

const intentCopy = {
  tips: 'Support the stream through Cash App: $yourhandle. Before sending, confirm the profile name and amount. I will never ask for your PIN or sign-in code.',
  mods: 'Moderator payment note: confirm the Cash App recipient privately before sending. Include the stream date and what the payment covers in your own records.',
  giveaways: 'Giveaway payment note: winners never need to pay to unlock a prize. Confirm the recipient privately, then send only the amount stated in the published giveaway rules.'
};

document.querySelectorAll('[data-intent]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.intent-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const result = document.querySelector('#intent-result');
    if (result) result.textContent = intentCopy[button.dataset.intent];
    const status = document.querySelector('#copy-status');
    if (status) status.textContent = '';
  });
});

const copyButton = document.querySelector('#copy-panel');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const panelText = document.querySelector('#intent-result')?.textContent || '';
    const status = document.querySelector('#copy-status');

    try {
      await navigator.clipboard.writeText(panelText);
      if (status) status.textContent = 'Copied. Replace $yourhandle before posting.';
    } catch {
      if (status) status.textContent = 'Select the text above and copy it manually.';
    }
  });
}

const eligibilityCopy = {
  starting: 'Start with the account terms and funding requirements. In most cases, Ally says basic CoverDraft eligibility begins 30 days after a total of $100 has been deposited into an eligible Spending Account. Eligibility does not guarantee every transaction will be covered.',
  deposit: 'Depositing a total of $100 is part of the usual path to basic CoverDraft eligibility, but coverage is not immediate. Ally says the account generally must wait 30 days after the qualifying deposit total is reached.',
  direct: 'Qualifying direct deposit can unlock a different path: Ally says at least $250 in qualifying direct deposits for two consecutive months may allow expanded coverage up to $250. At least one qualifying direct deposit every 45 days is generally needed to maintain it.'
};

document.querySelectorAll('[data-eligibility]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.eligibility-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const result = document.querySelector('#eligibility-result');
    if (result) result.textContent = eligibilityCopy[button.dataset.eligibility];
  });
});

const panelBuilder = document.querySelector('#panel-builder-form');
if (panelBuilder) {
  const streamName = document.querySelector('#stream-name');
  const cashtag = document.querySelector('#cashtag');
  const wording = document.querySelector('#support-wording');
  const output = document.querySelector('#generated-panel-copy');

  const cleanCashtag = (value) => {
    const cleaned = value.trim().replace(/\s+/g, '');
    if (!cleaned) return '$yourhandle';
    return cleaned.startsWith('$') ? cleaned : `$${cleaned}`;
  };

  const renderPanelCopy = () => {
    const name = streamName?.value.trim();
    const handle = cleanCashtag(cashtag?.value || '');
    const labels = {
      support: 'Support the stream',
      tip: 'Send a tip',
      community: 'Support the community'
    };
    const heading = labels[wording?.value] || labels.support;
    const channelLine = name ? ` for ${name}` : '';
    const plainText = `${heading}${channelLine}\nCash App: ${handle}\nBefore sending, confirm the profile name and amount. I will never ask for your PIN or sign-in code.`;

    if (output) {
      output.textContent = plainText;
      output.dataset.plainText = plainText;
    }
    const status = document.querySelector('#generated-copy-status');
    if (status) status.textContent = '';
  };

  panelBuilder.addEventListener('input', renderPanelCopy);
  panelBuilder.addEventListener('change', renderPanelCopy);
  renderPanelCopy();
}

const generatedCopyButton = document.querySelector('#copy-generated-panel');
if (generatedCopyButton) {
  generatedCopyButton.addEventListener('click', async () => {
    const output = document.querySelector('#generated-panel-copy');
    const panelText = output?.dataset.plainText || output?.textContent || '';
    const status = document.querySelector('#generated-copy-status');

    try {
      await navigator.clipboard.writeText(panelText);
      if (status) status.textContent = 'Copied. Test the link on your public Twitch channel before going live.';
    } catch {
      if (status) status.textContent = 'Select the panel text above and copy it manually.';
    }
  });
}
